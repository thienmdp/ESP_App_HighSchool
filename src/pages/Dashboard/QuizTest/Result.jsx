import { useState, useEffect } from "react";
import { auth, db } from '../../../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Result({ totalQuestion, result, }) {
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [result3, setResult3] = useState('');

  const getCurrentDateTime = () => {
    return new Date(); // Trả về đối tượng Date của giờ hiện tại
  };

  // Hàm chuyển đổi Date thành timestamp (theo định dạng số giây từ 1970)
  const dateToTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000); // Chuyển đổi từ milliseconds thành seconds
  };
  const userId = auth.currentUser?.uid;
  const currentDateTime = getCurrentDateTime();
  const timestamp = dateToTimestamp(currentDateTime);
  const generateRandomId = () => {
    return `${Math.random().toString(36).substr(2, 9)}-${Date.now().toString(36)}`;
  };

  const handleSendResults = async () => {
    const TestId = generateRandomId();

    try {
      await setDoc(doc(db, 'TestDassResult', TestId), {
        stress: result.stressLevel * 2,
        anxiety: result.anxietyLevel * 2,
        depression: result.depressionLevel * 2,
        anxietyResult: result2,
        depressionResult: result3,
        stressResult: result1,
        dateTime: timestamp,
        userId: userId,
      });
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };

  const stressResult = (stress) => {
    if (stress <= 14) {
      setResult1('Đánh giá: Bạn không có dấu hiệu rồi loạn về stress')
    } else if (stress > 14 && stress < 19) {
      setResult1('Đánh giá: Bạn có dấu hiệu rồi loạn stress nhẹ')
    } else if (stress >= 19 && stress <= 25) {
      setResult1('Đánh giá: Bạn có dấu hiệu rồi loạn stress vừa')
    } else if (stress > 25 && stress <= 33) {
      setResult1('Đánh giá: Bạn có dấu hiệu rồi loạn stress nặng')
    } else {
      setResult1('Đánh giá: Bạn có dấu hiệu rồi loạn stress rất nặng')
    }
  }

  const anxietyResult = (anxiety) => {
    if (anxiety <= 7) {
      setResult2('Đánh giá: Bạn không có dấu hiệu rối loạn về lo âu')
    } else if (anxiety > 7 && anxiety <= 9) {
      setResult2('Đánh giá: Bạn có dấu hiệu rối loạn lo âu nhẹ')
    } else if (anxiety >= 10 && anxiety <= 14) {
      setResult2('Đánh giá: Bạn có dấu hiệu rối loạn lo âu vừa')
    } else if (anxiety > 14 && anxiety <= 19) {
      setResult2('Đánh giá: Bạn có dấu hiệu rối loạn lo âu nặng')
    } else {
      setResult2('Đánh giá: Bạn có dấu hiệu rối loạn lo âu rất nặng')
    }
  }

  const depressionResult = (depression) => {
    if (depression <= 9) {
      setResult3('Đánh giá: Bạn không có dấu hiệu trầm cảm ')
    } else if (depression > 9 && depression <= 13) {
      setResult3('Đánh giá: Bạn có dấu hiệu trầm cảm nhẹ')
    } else if (depression >= 14 && depression <= 20) {
      setResult3('Đánh giá: Bạn có dấu hiệu trầm cảm vừa')
    } else if (depression > 20 && depression <= 27) {
      setResult3('Đánh giá: Bạn có dấu hiệu trầm cảm nặng')
    } else {
      setResult3('Đánh giá: Ban có dấu hiệu trầm cảm rất nặng')
    }
  }

  useEffect(() => {
    stressResult(result.stressLevel);
    anxietyResult(result.anxietyLevel);
    depressionResult(result.depressionLevel);
  }, [result]); // Chạy khi `result` thay đổi

  useEffect(() => {
    if (result1 && result2 && result3) {
      handleSendResults();
    }
  }, [result1, result2, result3]); // Chạy khi `result1`, `result2`, và `result3` thay đổi

  return (
    <div className='text-center p-8 text-lg tracking-[1.5px] text-default min-h-[450px] mb-32 flex flex-col justify-center items-center'>
      <p className='mb-8 text-3xl font-semibold text-center text-green-500'>Result</p>
      <p className='mb-4'>
        Total Questions: <span className='font-bold text-green-500'>{totalQuestion}</span>
      </p>

      <p className='mb-4'>
        Stress Level: <span className='font-bold text-green-500'>{result.stressLevel * 2}</span>
      </p>
      <p className='mb-4'>
        <span className='font-bold text-green-500'>{result1}</span>
      </p>
      <p className='mb-4'>
        Anxiety Level: <span className='font-bold text-green-500'>{result.anxietyLevel * 2}</span>
      </p>
      <p className='mb-4'>
        <span className='font-bold text-green-500'>{result2}</span>
      </p>
      <p className='mb-8 '>
        Depression Level: <span className='font-bold text-green-500'>{result.depressionLevel * 2}</span>
      </p>
      <p className='mb-4'>
        <span className='font-bold text-green-500'>{result3}</span>
      </p>
    </div>
  );
}
