import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { collection, query, where, orderBy, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import * as Math from 'mathjs';

function Heathoveral() {
    const [result1, setResult1] = useState('');
    const [result2, setResult2] = useState('');
    const [result3, setResult3] = useState('');
    const [stress, setStress] = useState(0);
    const [anxiety, setAnxiety] = useState(0);
    const [depression, setDepression] = useState(0);
    const percentage3 = (depression / 42) * 100;
    const percentage2 = (anxiety / 42) * 100;
    const percentage1 = (stress / 42) * 100;
    const userId = auth.currentUser?.uid;
    const [testHistory, setTestHistory] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [userStatus, setUserStatus] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const getColor = (value, thresholds, colors) => {
        if (value <= thresholds[0]) return colors[0];
        if (value <= thresholds[1]) return colors[1];
        if (value <= thresholds[2]) return colors[2];
        return colors[3];
    };

    const fetchUserStatus = async () => {
        try {
            const userQuery = query(collection(db, 'User'), where('Id', '==', userId));
            const userQuerySnapshot = await getDocs(userQuery);

            if (!userQuerySnapshot.empty) {
                setUserStatus('User');
                return;
            }

            const doctorQuery = query(collection(db, 'Doctor'), where('Id', '==', userId));
            const doctorQuerySnapshot = await getDocs(doctorQuery);

            if (!doctorQuerySnapshot.empty) {
                setUserStatus('Doctor');
                fetchPatients();
            } else {
                setUserStatus(null);
            }
        } catch (error) {
            console.error('Error fetching user status:', error);
        }
    };

    const fetchPatients = async () => {
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

            const userDetails = [];
            for (const id of fetchedUserIds) {
                const userDoc = await getDoc(doc(db, 'User', id));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    userDetails.push({ 
                        id: userDoc.id, 
                        name: userData.user || 'Không có tên', // Use 'Không có tên' if name is not availabl
                        ...userData 
                    });
                }
            }

            setUsers(userDetails);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserStatus();
            if (userStatus === 'User') {
                // Fetch data for the current user
                try {
                    const testRef = collection(db, 'TestDassResult');
                    const q = query(
                        testRef,
                        where('userId', '==', userId),
                        orderBy('dateTime', 'desc'),
                        limit(1)
                    );
                    const querySnapshot = await getDocs(q);
                    
                    if (!querySnapshot.empty) {
                        const latestTest = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
                        setSelectedTest(latestTest);
                        setStress(latestTest.stress);
                        setAnxiety(latestTest.anxiety);
                        setDepression(latestTest.depression);
                    }

                    // Fetch all tests for history
                    const historyQuery = query(
                        testRef,
                        where('userId', '==', userId),
                        orderBy('dateTime', 'desc')
                    );
                    const historySnapshot = await getDocs(historyQuery);
                    const history = historySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setTestHistory(history);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [userId, userStatus]);

    const stressResult = (stress) => {
        if (stress <= 14) {
            setResult1('Đánh giá: Bạn không có dấu hiệu rối loạn về stress');
        } else if (stress > 14 && stress < 19) {
            setResult1('Đánh giá: Bạn có dấu hiệu rối loạn stress nhẹ');
        } else if (stress >= 19 && stress <= 25) {
            setResult1('Đánh giá: Bạn có dấu hiệu rối loạn stress vừa');
        } else if (stress > 25 && stress <= 33) {
            setResult1('Đánh giá: Bạn có dấu hiệu rối loạn stress nặng');
        } else {
            setResult1('Đánh giá: Bạn có dấu hiệu rối loạn stress rất nặng');
        }
    };

    const anxietyResult = (anxiety) => {
        if (anxiety <= 7) {
            setResult2('Đánh giá: Bạn không có dấu hiệu rối loạn về lo âu');
        } else if (anxiety > 7 && anxiety <= 9) {
            setResult2('Đánh giá: Bạn có dấu hiệu rối loạn lo âu nhẹ');
        } else if (anxiety >= 10 && anxiety <= 14) {
            setResult2('Đánh giá: Bạn có dấu hiệu rối loạn lo âu vừa');
        } else if (anxiety > 14 && anxiety <= 19) {
            setResult2('Đánh giá: Bạn có dấu hiệu rối loạn lo âu nặng');
        } else {
            setResult2('Đánh giá: Bạn có dấu hiệu rối loạn lo âu rất nặng');
        }
    };

    const depressionResult = (depression) => {
        if (depression <= 9) {
            setResult3('Đánh giá: Bạn không có dấu hiệu trầm cảm ');
        } else if (depression > 9 && depression <= 13) {
            setResult3('Đánh giá: Bạn có dấu hiệu trầm cảm nhẹ');
        } else if (depression >= 14 && depression <= 20) {
            setResult3('Đánh giá: Bạn có dấu hiệu trầm cảm vừa');
        } else if (depression > 20 && depression <= 27) {
            setResult3('Đánh giá: Bạn có dấu hiệu trầm cảm nặng');
        } else {
            setResult3('Đánh giá: Bạn có dấu hiệu trầm cảm rất nặng');
        }
    };

    useEffect(() => {
        stressResult(stress);
        anxietyResult(anxiety);
        depressionResult(depression);
    });

    const handleTestClick = (test) => {
        setSelectedTest(test);
        setStress(test.stress);
        setAnxiety(test.anxiety);
        setDepression(test.depression);
    };

    const handleUserSelect = async (selectedUserId) => {
        setSelectedUser(selectedUserId);
        // Fetch and set test data for the selected user
        try {
            const testRef = collection(db, 'TestDassResult');
            const q = query(
                testRef,
                where('userId', '==', selectedUserId),
                orderBy('dateTime', 'desc'),
                limit(1)
            );
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const latestTest = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
                setSelectedTest(latestTest);
                setStress(latestTest.stress);
                setAnxiety(latestTest.anxiety);
                setDepression(latestTest.depression);
            }

            // Fetch all tests for history
            const historyQuery = query(
                testRef,
                where('userId', '==', selectedUserId),
                orderBy('dateTime', 'desc')
            );
            const historySnapshot = await getDocs(historyQuery);
            const history = historySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTestHistory(history);
        } catch (error) {
            console.error('Error fetching data for selected user:', error);
        }
    };

    const formatDate = (timestamp) => {
        if (timestamp) {
            // Convert Unix timestamp (seconds) to milliseconds
            const date = new Date(timestamp * 1000);
            return date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return 'Invalid Date';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <header className="text-3xl font-bold mb-12 bg-green-400 p-4 rounded text-center">Tổng quan về sức khỏe tâm thần</header>
            
            {userStatus === 'Doctor' && (
                <div className="w-full max-w-4xl mb-8">
                    <h2 className="text-2xl font-bold mb-4">Chọn bệnh nhân</h2>
                    <select 
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => handleUserSelect(e.target.value)}
                        value={selectedUser || ''}
                    >
                        <option value="">Chọn bệnh nhân</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name || user.id}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex flex-row items-center justify-center w-full">
                <div className="w-full max-w-md py-10">
                    <p className='text-xl font-bold pl-8'>Số điểm mức độ stress: <span className="font-bold text-green-400">{stress}</span></p>

                    <CircularProgressbar
                        className='w-1/6 max-w-64 pt-10 pl-12 '
                        circleRatio={0.75}
                        value={percentage1}
                        text={`${Math.round(stress)}`}
                        styles={{
                            // Customize the path, i.e. the "completed progress"
                            path: {
                                // Path color: Dark blue
                                stroke: getColor(stress, [14, 19, 25], ['#4caf50', '#ffeb3b', '#ff9800', '#f44336'])
                                , // Màu xanh đậm
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
                                fontSize: '12px',
                                // Text weight
                                fontWeight: 'bold', // Chữ đậm
                            },
                            // Customize background - only used when the `background` prop is true
                            background: {
                                fill: '#3e98c7',
                            },
                        }}
                        // Additional container styling for size
                        style={{ width: '40px', height: '40px' }} // Điều chỉnh kích thước nhỏ hơn
                    />
                    <p>{result1}</p>
                </div>

                <div className="w-full max-w-md py-10 pr-14 items-center ">
                    <p className='text-xl font-bold pl-10'>Số điểm mức độ lo âu: <span className="font-bold text-green-400">{anxiety}</span></p>

                    <CircularProgressbar
                        className='w-1/6 max-w-64 pt-10 pl-12 '
                        circleRatio={0.75}
                        value={percentage2}
                        text={`${Math.round(anxiety)}`}
                        styles={{
                            // Customize the path, i.e. the "completed progress"
                            path: {
                                // Path color: Dark blue
                                stroke: getColor(anxiety, [7, 9, 14], ['#4caf50', '#ffeb3b', '#ff9800', '#f44336'])
                                , // Màu xanh đậm
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
                                fontSize: '12px',
                                // Text weight
                                fontWeight: 'bold', // Chữ đậm
                            },
                            // Customize background - only used when the `background` prop is true
                            background: {
                                fill: '#3e98c7',
                            },
                        }}
                        // Additional container styling for size
                        style={{ width: '40px', height: '40px' }} // Điều chỉnh kích thước nhỏ hơn
                    />
                    <p>{result2}</p>
                </div>

                <div className="w-full max-w-md py-10 pr-10 ">
                    <p className='text-xl font-bold pl-8'>Số điểm mức độ Trầm cảm: <span className="font-bold text-green-400 ">{depression}</span></p>

                    <CircularProgressbar
                        className='w-1/6 max-w-64 pt-10 pl-12  '
                        circleRatio={0.75}
                        value={percentage3}
                        text={`${Math.round(depression)}`}
                        styles={{
                            // Customize the path, i.e. the "completed progress"
                            path: {
                                // Path color: Dark blue
                                stroke: getColor(depression, [9, 13, 20], ['#4caf50', '#ffeb3b', '#ff9800', '#f44336']), // Màu xanh đậm
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
                                fontSize: '12px',
                                // Text weight
                                fontWeight: 'bold', // Chữ đậm
                            },
                            // Customize background - only used when the `background` prop is true
                            background: {
                                fill: '#3e98c7',
                            },
                        }}
                        // Additional container styling for size
                        style={{ width: '40px', height: '40px' }} // Điều chỉnh kích thước nhỏ hơn
                    />
                    <p>{result3}</p>
                </div>
            </div>

            <div className="w-full max-w-4xl mt-12">
                <h2 className="text-2xl font-bold mb-4">Lịch sử bài kiểm tra</h2>
                <div className="h-64 overflow-y-auto border border-gray-300 rounded">
                    {testHistory.map((test) => (
                        <div
                            key={test.id}
                            className={`p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100 ${
                                selectedTest && selectedTest.id === test.id ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => handleTestClick(test)}
                        >
                            <p>Ngày: {formatDate(test.dateTime)}</p>
                            <p>Stress: {test.stress}, Lo âu: {test.anxiety}, Trầm cảm: {test.depression}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Heathoveral
