import React from 'react';
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaHeartbeat } from "react-icons/fa";
import { BarChart, PieChart, Bar, XAxis, YAxis, Pie, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ref, onValue } from 'firebase/database';
import { db, auth, database } from '../../firebaseConfig';
import { collection, query, where, orderBy, getDocs, getDoc, doc } from 'firebase/firestore';
import moment from 'moment';
import { format } from 'date-fns';
import { SiOxygen } from "react-icons/si";
import { RiFootprintLine } from "react-icons/ri";
import { CustomHeartRateChart } from './components/CustomBarChart';
import { CustomSPO2Chart } from './components/CustomSPO2Chart';
import SleepStageChart from './components/SleepStageChart';
import DatePicker from 'react-datepicker'; // Add this import
import 'react-datepicker/dist/react-datepicker.css'; // Add this import
import { useMemo } from 'react';

// Hàm tính tổng thời gian ngủ cho mỗi giai đoạn
const calculateSleepStages = (stages) => {
  const sleepStages = {
    Awake: 0,
    Light: 0,
    Deep: 0,
    REM: 0
  };

  stages.forEach(stage => {
    const duration = moment(stage.endTime).diff(moment(stage.startTime), 'minutes');
    switch (stage.stage) {
      case 1:
        sleepStages.Awake += duration;
        break;
      case 4:
        sleepStages.Light += duration;
        break;
      case 5:
        sleepStages.Deep += duration;
        break;
      case 6:
        sleepStages.REM += duration;
        break;
      default:
        break;
    }
  });

  // Chuyển đổi từ phút sang giờ và làm tròn đến 1 chữ số thập phân
  Object.keys(sleepStages).forEach(key => {
    sleepStages[key] = Number((sleepStages[key] / 60).toFixed(1));
  });

  return sleepStages;
};

function Dashboard() {
  const userId = auth.currentUser?.uid;
  const [usersId, setusersId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [totalSleepData, setTotalSleepData] = useState([])
  const [heartrateData, setHeartRateData] = useState([])
  const [spo2Data, setSPO2Data] = useState([]);
  const [stepData, setStepData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleUserClick = async (userId, userName) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    await fetchUserData(userId, selectedDate);
  };

  const fetchUserData = async (userId, date) => {
    const data = await fetchSelectedUserData(userId, date);
    const datasleep = await fetchSelectedUserSleepData7Days(userId, date)
    const dataheart = await fetchSelectedUserHeartRateData7Days(userId, date)
    const dataSPO2 = await fetchSelectedUserSPO2Data7Days(userId, date);
    const dataStep = await fetchSelectedUserStepData7Days(userId, date);
    setTotalSleepData(datasleep)
    setSelectedUserData(data);
    setHeartRateData(dataheart)
    setSPO2Data(dataSPO2);
    setStepData(dataStep);
  };

  useEffect(() => {
    const fetchUserIds = async () => {
      try {
        const appointmentQuery = query(
          collection(db, 'Appoinment'),
          where('doctorId', '==', userId),
          orderBy('userId')
        );
        const appointmentSnapshot = await getDocs(appointmentQuery);

        const fetchedUserIds = [];
        appointmentSnapshot.forEach((doc) => {
          const userId = doc.data().userId;
          if (!fetchedUserIds.includes(userId)) {
            fetchedUserIds.push(userId);
          }
        });

        setusersId(fetchedUserIds);

        const userDetails = [];
        for (const id of fetchedUserIds) {
          const userDoc = await getDoc(doc(db, 'User', id));
          if (userDoc.exists()) {
            userDetails.push({ id: userDoc.id, ...userDoc.data() });
          }
        }

        setUsers(userDetails);
      } catch (error) {
        console.error('Error fetching User ids:', error);
      }
    };

    fetchUserIds();
  }, [userId]);

  useEffect(() => {
    if (usersId && usersId.length > 0) {
      const fetchDataForInitialUser = async () => {
        await fetchUserData(usersId[0], selectedDate);
        setSelectedUserId(usersId[0]);
        setSelectedUserName(users[0]?.user);
      };
      fetchDataForInitialUser();
    }
  }, [usersId, users]);

  const barChartData = totalSleepData?.map((item) => ({
    name: moment(item.date).format('MM-DD'),
    hour: item.minutes,
  })) || [];

  const fetchSelectedUserSleepData7Days = async (selectedUserId, currentDate) => {
    try {
      const totalSleepMinutes = [];
      for (let i = 6; i >= 0; i--) {
        const date = moment(currentDate).subtract(i, 'days').format('YYYY-MM-DD');
        const dataRef = ref(database, `${selectedUserId}/${date}`);
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          if (data?.sleepDetail?.totalSleepMinutes) {
            totalSleepMinutes.push({
              date: date,
              minutes: (data.sleepDetail.totalSleepMinutes / 60).toFixed(2),
            });
          } else {
            totalSleepMinutes.push({ date: date, hour: 0 });
          }
        });
      }
      console.log(totalSleepMinutes)
      return totalSleepMinutes;
    } catch (error) {
      console.error('Error fetching selected user sleep data:', error);
      return [];
    }
  };

  const fetchSelectedUserHeartRateData7Days = async (selectedUserId, currentDate) => {
    try {
      const totalHeartRate = [];
      const promises = [];

      for (let i = 6; i >= 0; i--) {
        const date = moment(currentDate).subtract(i, 'days').format('YYYY-MM-DD');
        const dataRef = ref(database, `${selectedUserId}/${date}`);

        promises.push(
          new Promise((resolve) => {
            onValue(dataRef, (snapshot) => {
              const data = snapshot.val();
              if (data?.heartData?.min && data?.heartData?.max) {
                totalHeartRate.push({
                  date: date,
                  min: data.heartData.min,
                  max: data.heartData.max
                });
              } else {
                totalHeartRate.push({ date: date, min: 0, max: 0 });
              }
              resolve();
            }, { onlyOnce: true });
          })
        );
      }

      await Promise.all(promises);
      return totalHeartRate;
    } catch (error) {
      console.error('Error fetching selected user heartRate data:', error);
      return [];
    }
  };

  const fetchSelectedUserSPO2Data7Days = async (selectedUserId, currentDate) => {
    try {
      const totalSPO2 = [];
      const promises = [];

      for (let i = 6; i >= 0; i--) {
        const date = moment(currentDate).subtract(i, 'days').format('YYYY-MM-DD');
        const dataRef = ref(database, `${selectedUserId}/${date}`);

        promises.push(
          new Promise((resolve) => {
            onValue(dataRef, (snapshot) => {
              const data = snapshot.val();
              if (data?.oxygenSaturationData?.min && data?.oxygenSaturationData?.max) {
                totalSPO2.push({
                  date: date,
                  min: data.oxygenSaturationData.min,
                  max: data.oxygenSaturationData.max
                });
              } else {
                totalSPO2.push({ date: date, min: 0, max: 0 });
              }
              resolve();
            }, { onlyOnce: true });
          })
        );
      }

      await Promise.all(promises);
      return totalSPO2;
    } catch (error) {
      console.error('Error fetching selected user SPO2 data:', error);
      return [];
    }
  };

  const fetchSelectedUserStepData7Days = async (selectedUserId, currentDate) => {
    try {
      const totalSteps = [];
      const promises = [];

      for (let i = 6; i >= 0; i--) {
        const date = moment(currentDate).subtract(i, 'days').format('YYYY-MM-DD');
        const dataRef = ref(database, `${selectedUserId}/${date}`);

        promises.push(
          new Promise((resolve) => {
            onValue(dataRef, (snapshot) => {
              const data = snapshot.val();
              if (data?.stepData) {
                totalSteps.push({
                  date: date,
                  steps: data.stepData
                });
              } else {
                totalSteps.push({ date: date, steps: 0 });
              }
              resolve();
            }, { onlyOnce: true });
          })
        );
      }

      await Promise.all(promises);
      return totalSteps;
    } catch (error) {
      console.error('Error fetching selected user step data:', error);
      return [];
    }
  };

  const fetchSelectedUserData = async (selectedUserId, date) => {
    try {
      const currentDate = moment(date).format('YYYY-MM-DD');
      const dataRef = ref(database, `${selectedUserId}/${currentDate}`);

      return new Promise((resolve) => {
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            console.log("Selected User Data for current day:", data);
            resolve(data);
          } else {
            console.log("No data available for the selected user on the current day.");
            resolve(null);
          }
        }, { onlyOnce: true });
      });
    } catch (error) {
      console.error('Error fetching selected user data:', error);
      return null;
    }
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    if (selectedUserId) {
      await fetchUserData(selectedUserId, date);
    }
  };

  const sleepStageData = useMemo(() => {
    if (selectedUserData?.stages) {
      const stages = calculateSleepStages(selectedUserData.stages);
      return [
        { name: 'Thức', value: stages.Awake },
        { name: 'Ngủ nhẹ', value: stages.Light },
        { name: 'Ngủ sâu', value: stages.Deep },
        { name: 'REM', value: stages.REM }
      ];
    }
    return [];
  }, [selectedUserData?.stages]);

  return (
    <div className='h-full w-full bg-green-200 flex flex-col justify-start'>
      <header className='text-center mb-12'>
        <h1 className='text-4xl font-bold  w-full bg-white pb-4 justify-center items-center pt-4 text-green-600'>LNA Health</h1>
      </header>


      <section className='bg-white p-8 border border-gray-300 rounded-lg shadow-lg mb-10 mx-12'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6'>Danh sách bệnh nhân</h2>
        <div className='flex justify-between items-center mb-6'>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="p-3 border border-gray-300 rounded-lg shadow-sm"
          />
          <div className="text-lg font-semibold text-gray-700">
            Ngày đang chọn: {moment(selectedDate).format('DD/MM/YYYY')}
          </div>
          <div className="text-lg font-semibold text-gray-700">
            Người dùng đang chọn: {selectedUserName || 'Chưa chọn'}
          </div>
        </div>
        <div className='flex flex-col space-y-4'>
          {users.map((user) => (
            <div key={user.id} className="p-4 bg-gray-50 font-medium rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-100 transition duration-200">
              <span className='text-lg text-gray-700'>{user.user}</span>
              <div className="flex flex-row space-x-6 items-center">
                <p className='text-gray-600'>Số điện thoại: <span className='font-semibold'>{user.phonenumber}</span></p>
                <p className='text-gray-600'>Email: <span className='font-semibold'>{user.email}</span></p>
                <button onClick={() => handleUserClick(user.id, user.user)} className="font-semibold p-2 rounded-lg border border-green-300 bg-green-400 text-white hover:bg-green-500 transition duration-200">Theo dõi sức khoẻ</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* hiệU suất giấc ngủ */}
      <section className='flex flex-col justify-center items-center mb-8'>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow w-3/4 flex">
          <div className="w-1/2 pr-4">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Tổng thời gian ngủ trong tuần</h3>
            <p className="text-gray-700">Giấc ngủ của bạn đang ở trạng thái ổn nhưng còn chập chờn, bạn hãy theo dỏi và chú ý thêm về giấc ngủ của mình nhé</p>
          </div>
          {/* Second Part: Chart */}
          <div className="w-3/4 pl-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 16, fill: '#666', fontWeight: 'bold' }} />
                <YAxis tick={{ fontSize: 16, fill: '#666', fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                <Legend wrapperStyle={{ fontSize: 16, color: '#666', fontWeight: 'bold' }} />
                <Bar dataKey="hour" fill="#0099FF" barSize={30} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow w-3/4 flex mt-10">
          {/* Các giai đoạn giấc ngủ */}

          <div className="w-1/2 pr-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Các giai đoạn giấc ngủ:</h3>
            <div className="flex flex-col space-y-2 pt-10">
              <div className="flex items-center">
                <span className="text-gray-700 text-sm mr-2">Thức: </span>
                <span className="w-4 h-4 bg-red-500 inline-block "></span>

              </div>
              <div className="flex items-center">
                <span className="text-gray-700 text-sm mr-2">Ngủ nhẹ: </span>

                <span className="w-4 h-4 bg-purple-500 inline-block "></span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 text-sm mr-2">Ngủ sâu: </span>

                <span className="w-4 h-4 bg-blue-500 inline-block "></span>
              </div>
              <div className="flex items-center ">
                <span className="text-gray-700 text-sm mr-2">REM: </span>

                <span className="w-4 h-4 bg-blue-300 inline-block "></span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 300, color: 'blue' }}>
            <SleepStageChart data={selectedUserData} />
          </div>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow w-3/4 flex mt-10">
          {/* các dai đoạn giấc ngủ*/}
          <div className="w-1/2 pr-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Các giai đoạn giấc ngủ:</h3>
            <p className="text-gray-700">Giấc ngủ của bạn đang ở trạng thái ổn nhưng còn chập chờn, bạn hãy theo dõi và chú ý thêm về giấc ngủ của mình nhé</p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer>
              <BarChart data={sleepStageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fontSize: 16, fill: '#666', fontWeight: 'bold' }} />
                <YAxis label={{ value: 'Giờ', angle: -90, position: 'insideLeft', fontSize: 16, fill: '#666', fontWeight: 'bold' }} />
                <Tooltip formatter={(value) => [`${value} giờ`, 'Thời gian']} contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }} />
                <Legend wrapperStyle={{ fontSize: 16, color: '#666', fontWeight: 'bold' }} />
                <Bar dataKey="value" fill="#82ca9d" name="Thời gian (giờ)" barSize={30} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>



      </section >

      {/*Các thông số của cơ thể*/}
      < section className='flex flex-col pl-10 justify-between' >
        <h2 className='text-2xl font-bold text-gray-800 mb-8'>Các thông số của cơ thể:</h2>
        <div className="flex flex-row justify-start space-x-8">
          <div className='flex flex-col space-y-8'>
            <div className='flex flex-row space-x-4'>
              {/* Heart Rate Component */}
              <div className="max-w-60 max-h-60 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-red-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Nhịp tim:</h5>
                <div className="w-40 h-40">
                  <CircularProgressbar
                    value={100}
                    text={`${selectedUserData?.heartData?.current || 0} bpm`}
                    styles={buildStyles({
                      strokeLinecap: 'round',
                      textSize: '16px',
                      pathTransitionDuration: 0.5,
                      pathColor: '#DF0029',
                      textColor: '#000',
                      trailColor: '#E0E0E0',
                    })}
                  />
                </div>
              </div>

              {/* Oxygen Level Component */}
              <div className="max-w-60 max-h-60 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Nồng độ Oxy:</h5>
                <div className="w-40 h-40">
                  <CircularProgressbar
                    value={100}
                    text={`${selectedUserData?.oxygenSaturationData?.current || 0}%`}
                    styles={buildStyles({
                      strokeLinecap: 'round',
                      textSize: '16px',
                      pathTransitionDuration: 0.5,
                      pathColor: '#4169E1',
                      textColor: '#000',
                      trailColor: '#E0E0E0',
                    })}
                  />
                </div>
              </div>

              {/* Step Count Component */}
              <div className="max-w-60 max-h-60 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-green-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Bước chân:</h5>
                <div className="w-40 h-40">
                  <CircularProgressbar
                    value={100}
                    text={selectedUserData?.stepData || 0}
                    styles={buildStyles({
                      strokeLinecap: 'round',
                      textSize: '16px',
                      pathTransitionDuration: 0.5,
                      pathColor: "#5BBD2B",
                      textColor: '#000',
                      trailColor: '#E0E0E0',
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="max-w-full max-h-full w-full flex justify-center items-center p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-green-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 self-center">
              <h5 className="mb-2 text-4xl font-bold tracking-tight text-blue-400 dark:text-white">Hiệu suất giấc ngủ:</h5>
              <CircularProgressbar
                className='w-2/6 max-w-72 pt-10 pl-12  '
                circleRatio={0.75}
                value={selectedUserData?.sleepEfficient}
                text={`${selectedUserData?.sleepEfficient}%`}
                styles={{
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color: Dark blue
                    stroke: '#87CEFA',
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path to start from the top
                    transform: 'rotate(0.621turn)', // Xoay để bắt đầu từ đỉnh
                    transformOrigin: 'center center',
                    // Limit the path length
                    strokeDasharray: '1 1', // Hiển thị theo tỷ lệ của circleRatio
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    rotate: 0.75,
                    // Trail color (make it white or transparent)
                    stroke: '#E0E0E0',
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',
                    // Rotate the trail to align with the path
                    transform: 'rotate(0.621turn)',
                    transformOrigin: 'center center',
                    // Match the strokeDasharray to make it half
                    strokeDasharray: '1 1',
                  },
                  // Customize the text
                  text: {
                    // Text color: Dark white
                    fill: '#000', // Màu trắng đậm
                    // Text size
                    fontSize: '20px',
                    // Text weight
                    fontWeight: 'semibold', // Chữ đậm
                  },
                  // Customize background - only used when the `background` prop is true
                  background: {
                    fill: '#3e98c7',
                  },
                }}
                // Additional container styling for size
                style={{ width: '40px', height: '40px' }} // Điều chỉnh kích thước nhỏ hơn
              />
            </div>
          </div>

          {/*thông tin sức khoẻ*/}
          <div className='text-xl bg-white rounded-lg flex-col w-2/4 '>
            <h1 className='font-bold text-2xl flex justify-center pt-10 '>Chi tiết các thông số :</h1>

            <div className='flex-row border border-gray-200 shadow-lg rounded-xl m-10 p-6 bg-white'>

              <div className='flex items-center space-x-4 p-4'>
                <h1 className='font-bold text-2xl flex items-center'>
                  Số điểm Giấc ngủ:
                  <p className='ml-2 flex items-center text-blue-600 font-bold'>{selectedUserData?.sleepDetail?.sleepScore || 0}-{selectedUserData?.sleepDetail?.sleepQuality}</p>
                </h1>
              </div>

              <div className='font-semibold mr-4 p-4'>
                <div className='flex items-center mt-2'>
                  <p className='text-lg font-bold'>Giờ ngủ:</p>
                  <p className='ml-2 text-lg text-blue-600 font-semibold'>{selectedUserData?.stages?.[0]?.startTime ? moment(selectedUserData.stages[0].startTime).format('h:mm A') : 'N/A'}</p>
                </div>
                <div className='flex items-center mt-2'>
                  <p className='text-lg font-bold'>Giờ dậy:</p>
                  <p className='ml-2 text-lg text-blue-600 font-semibold'>{selectedUserData?.stages?.[selectedUserData.stages.length - 1]?.endTime ? moment(selectedUserData.stages[selectedUserData.stages.length - 1].endTime).format('h:mm A') : 'N/A'}</p>
                </div>
                <div className='flex items-center mt-2'>
                  <p className='text-lg font-bold'>Tổng thời gian ngủ:</p>
                  <p className='ml-2 text-lg text-blue-600 font-semibold'>{selectedUserData?.stages?.[0]?.startTime && selectedUserData?.stages?.[selectedUserData.stages.length - 1]?.endTime ? `${Math.floor(moment.duration(moment(selectedUserData.stages[selectedUserData.stages.length - 1].endTime).diff(moment(selectedUserData.stages[0].startTime))).asHours())}h ${moment.duration(moment(selectedUserData.stages[selectedUserData.stages.length - 1].endTime).diff(moment(selectedUserData.stages[0].startTime))).minutes()}m` : 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className='flex flex-row bg-white rounded-2xl m-10 items-center justify-between'>
              <div className='flex items-center'>
                <div className="flex items-center justify-center bg-red-500 text-white rounded-full w-12 h-12">
                  <FaHeartbeat className="text-2xl" />
                </div>
                <p className='text-xl font-bold ml-4'>Chỉ số nhịp tim:</p><p className='text-xl font-bold ml-2 text-red-600'>{selectedUserData?.heartData?.current}</p>
              </div>
              <div className='flex flex-col items-end'>
                <div className='bg-red-300 h-11 font-semibold text-white rounded-2xl w-[300px] flex items-center justify-center relative'>

                  <div className='absolute left-0 top-0 bottom-0 bg-red-600 flex items-center justify-center text-white' style={{
                    width: `${((selectedUserData?.heartData?.max - selectedUserData?.heartData?.min) / (140 - 30)) * 100}%`,
                    left: `${((selectedUserData?.heartData?.min - 30) / (140 - 30)) * 100}%`
                  }}>
                    <span className='z-10'>{selectedUserData?.heartData?.min}-{selectedUserData?.heartData?.max}</span>
                  </div>
                </div>
                <div className='text-sm mt-1 flex justify-between font-semibold'>
                  <p className='z-10'>30</p>
                  <p className='z-10 ml-[265px]'>140</p>
                </div>
              </div>
            </div>
            <div className='flex flex-row bg-white rounded-2xl m-10 items-center justify-between'>
              <div className='flex items-center'>
                <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-12 h-12">
                  <SiOxygen className="text-2xl" />
                </div>
                <p className='text-xl font-bold ml-4'>Nồng độ Oxy:</p><p className='text-xl font-bold ml-2 text-blue-600'>{selectedUserData?.oxygenSaturationData?.current}</p>
              </div>
              <div className='flex flex-col items-end'>
                <div className='bg-blue-300 h-11 font-semibold text-white rounded-2xl w-[300px] flex items-center justify-center relative'>
                  <div className='absolute left-0 top-0 bottom-0 bg-blue-600 flex items-center justify-center text-white' style={{
                    width: `${((selectedUserData?.oxygenSaturationData?.max - selectedUserData?.oxygenSaturationData?.min) / (100 - 70)) * 100}%`,
                    left: `${((selectedUserData?.oxygenSaturationData?.min - 70) / (100 - 70)) * 100}%`
                  }}>
                    <span className='z-10'>{selectedUserData?.oxygenSaturationData?.min}-{selectedUserData?.oxygenSaturationData?.max}</span>
                  </div>
                </div>
                <div className='text-sm mt-1 flex justify-between font-semibold'>
                  <p className='z-10'>70</p>
                  <p className='z-10 ml-[265px]'>100</p>
                </div>
              </div>
            </div>

            <div className='flex flex-row bg-white rounded-2xl m-10 items-center justify-between'>
              <div className='flex items-center'>
                <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-12 h-12">
                  <RiFootprintLine className="text-2xl" />
                </div>
                <p className='text-xl font-bold ml-4'>Bước chân:</p><p className='text-xl font-bold ml-2 text-green-600'>{selectedUserData?.stepData}</p>
              </div>
              <div className='flex flex-col items-end'>
                <div className='bg-green-300 h-11 font-semibold text-white rounded-2xl w-[300px] flex items-center justify-center relative'>
                  <div className='absolute left-0 top-0 bottom-0 bg-green-600 flex items-center justify-center text-white' style={{
                    width: `${(selectedUserData?.stepData / 20000) * 100}%`,
                  }}>
                    <span className='z-20 pl-10'>{selectedUserData?.stepData}</span>
                  </div>
                </div>
                <div className='text-sm mt-1 flex justify-between font-semibold'>
                  <p className='z-10'>0</p>
                  <p className='z-10 ml-[265px]'>20000</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section >

      < h1 className='font-bold text-2xl ml-20 mt-12' > Tổng quan trong tuần : </h1 >
      <section className="flex flex-col  justify-around mt-10">
        <div className="bg-white flex flex-col justify-center items-center w-2/3 p-4 border border-gray-200 rounded-lg shadow mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Nhịp tim trong tuần</h3>
          <div className="flex justify-center items-center w-full">
            <CustomHeartRateChart className='w-full' data={heartrateData} />
          </div>
          <div className="text-center mt-4">Nhịp tim</div>
        </div>
        <div className="bg-white flex flex-col justify-center items-center w-2/3 p-4 border border-gray-200 rounded-lg shadow mx-auto mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Nồng độ SPO2 trong tuần</h3>
          <div className="flex justify-center items-center w-full">
            <CustomSPO2Chart className='w-full' data={spo2Data} />
          </div>
          <div className="text-center mt-4">Nồng độ SPO2</div>
        </div>
        <div className="bg-white flex flex-col justify-center items-center w-2/3 p-4 border border-gray-200 rounded-lg shadow mx-auto mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Bước chân trong tuần</h3>
          <div className="flex justify-center items-center w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stepData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" interval={0} tickFormatter={(date) => moment(date).format('DD/MM')} tick={{ fontSize: 12, angle: -45, textAnchor: 'end', fontWeight: 'bold' }} />
                <YAxis tick={{ fontSize: 12, fontWeight: 'bold' }} />
                <Tooltip labelFormatter={(date) => moment(date).format('DD/MM/YYYY')} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="steps" fill="#4caf50" name="Bước chân" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">Bước chân</div>
        </div>
      </section>
    </div >
  )
}

export default Dashboard;