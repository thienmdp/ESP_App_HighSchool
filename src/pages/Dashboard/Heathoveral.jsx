import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import * as Math from 'mathjs'
function Heathoveral() {
    const [result1, setResult1] = useState('');
    const [result2, setResult2] = useState('');
    const [result3, setResult3] = useState('');
    const [stress, setStress] = useState(0);
    const [anxiety, setAnxiety] = useState(0);
    const [depression, setDepression] = useState(0);
    const percentage3 = (depression / 42) * 100
    const percentage2 = (anxiety / 42) * 100
    const percentage1 = (stress / 42) * 100
    const userId = auth.currentUser?.uid
    const getColor = (value, thresholds, colors) => {
        if (value <= thresholds[0]) return colors[0];
        if (value <= thresholds[1]) return colors[1];
        if (value <= thresholds[2]) return colors[2];
        return colors[3];
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const stressRef = collection(db, 'TestDassResult'); // Assuming "TestDassResult" is the collection name
                const q = query(stressRef, where('userId', '==', userId), orderBy('dateTime', 'desc'), limit(1)); // Filter by userId and order by earliest dateTime

                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {

                    const data = doc.data();
                    setStress(data.stress);
                    setAnxiety(data.anxiety);
                    setDepression(data.depression);
                });

                stressResult(stress);
                anxietyResult(anxiety);
                depressionResult(depression);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const stressResult = (stress) => {
        if (stress <= 14) {
            setResult1('Đánh giá: Bạn không có dấu hiệu rối loạn về stress')
        } else if (stress > 14 && stress < 19) {
            setResult1('Đánh giá: Bạn có dấu hiệu rối loạn stress nhẹ')
        } else if (stress >= 19 && stress <= 25) {
            setResult1('Đánh giá: Bạn có dấu hiệu rối loạn stress vừa')
        } else if (stress > 25 && stress <= 33) {
            setResult1('Đánh giá: Bạn có dấu hiệu rối loạn stress nặng')
        } else {
            setResult1('Đánh giá: Bạn có dấu hiệu rối loạn stress rất nặng')
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
            setResult3('Đánh giá: Bạn có dấu hiệu trầm cảm rất nặng')
        }
    }
    useEffect(() => {
        stressResult(stress);
        anxietyResult(anxiety);
        depressionResult(depression);
    })
    return (
        <div class="flex flex-col items-center justify-center min-h-screen pl-48  ">
            <header class="text-3xl font-bold mb-12 bg-green-400 p-4 rounded">Tổng quan về sức khỏe tâm thần của bạn</header>
            <div className=' flex-row flex justify-start place-items-start '>
                <div class="w-full max-w-md py-10 pr-10 ">
                    <p className='text-xl font-bold pl-8'>Số điểm mức độ stress: <span class="font-bold text-green-400">{ }</span></p>

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

                <div class="w-full max-w-md py-10 pr-14 items-center ">
                    <p className='text-xl font-bold pl-10'>Số điểm mức độ lo âu: <span class="font-bold text-green-400"></span></p>

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

                <div class="w-full max-w-md py-10 pr-10 ">
                    <p className='text-xl font-bold pl-8'>Số điểm mức độ Trầm cảm: <span class="font-bold text-green-400 ">{ }</span></p>

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
        </div >
    )
}

export default Heathoveral
