import { useState } from 'react'
import { QuizData } from '../../data/dummy'
import Quiz from './QuizTest/Quiz'

export default function ExamsTest() {
  const [start, setStart] = useState(false)
  return (
    <div className='max-w-6xl p-8 mx-auto'>
      <p className='text-5xl font-semibold text-center'>BÀI TEST TRẦM CẢM DASS 21</p>
      {!start && (
        <div className='grid px-8 mt-8 text-lg '>
          <p className='mb-2 text-xl font-semibold'>
            Bài test mức độ trầm cảm DASS 21 là một trong những phương pháp nhằm đánh giá về cảm xúc và mức độ trầm cảm
            tương đối phổ biến, được sử dụng trong các bệnh viện, phòng khám chuyên sâu về sức khoẻ tinh thần hiện nay.
          </p>

          <div className='mt-4'>
            <p className='mb-2 text-xl font-semibold'>Bài test nhằm mục đính:</p>
            <li className='list-disc'>Tự đánh giá tình trạng Sức khoẻ tinh thần cá nhân.</li>
            <li className='list-disc'>Dự đoán về Sức khoẻ tinh thần và có kế hoạch thăm khám phù hợp.</li>
            <li className='list-disc'>Tổng hợp thông tin để thuận tiện khi thăm khám với Bác sĩ/Chuyên gia.</li>
          </div>

          <div className='mt-4'>
            <p className='mb-2 text-xl font-semibold'>Bài test nhằm mục đính:</p>
            <li className='list-disc'>Tự đánh giá tình trạng Sức khoẻ tinh thần cá nhân.</li>
            <li className='list-disc'>Dự đoán về Sức khoẻ tinh thần và có kế hoạch thăm khám phù hợp.</li>
            <li className='list-disc'>Tổng hợp thông tin để thuận tiện khi thăm khám với Bác sĩ/Chuyên gia.</li>
          </div>

          <div className='mt-4'>
            <p className='mb-2 text-xl font-semibold'>Lưu ý:</p>
            <li className='list-disc'>
              Kết quả bài test này chỉ mang tính chất tham khảo, không có giá trị thay thế chẩn đoán y khoa bởi bác
              sĩ/chuyên gia có chuyên môn.
            </li>
          </div>

          <div className='mt-4'>
            <p className='mb-2 text-xl font-semibold'>Nguyên tắc thực hiện bài test:</p>
            <li className='list-disc'>
              Bài test bao gồm 21 đề mục, hãy đọc cẩn thận tất cả các câu và chọn ra một đáp án gần giống nhất với tình
              trạng mà bạn cảm thấy trong 1 tuần trở lại đây, kể cả hôm nay.
            </li>
          </div>

          <button
            className=' mt-8 flex items-center justify-center min-w-[150px] p-2 text-white transition-colors duration-300 rounded-md focus:outline-none bg-green-500 hover:bg-green-500/90'
            onClick={() => setStart(true)}
          >
            Bắt đầu
          </button>
        </div>
      )}
      {start && <Quiz questions={QuizData} />}
    </div>
  )
}
