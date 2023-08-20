import { useEffect, useState } from "react";
import { Space, Table, Tag, Input, Select, Button } from 'antd';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { PORT } from '../../set';
import './Board.css';
import '../../App';

/*
 회원 게시판 화면
 김선규
*/
const columns = [
  {
    title: '순번',
    dataIndex: 'bSeq',
    key: 'bSeq',
    width: '10%',
  },
  {
    title: '작성자',
    dataIndex: 'uSeq',
    key: 'uSeq',
  },
  {
    title: '제목',
    dataIndex: 'bTitle',
    key: 'bTitle',
    width: '40%',
    render: (text, record) => (
      <Link to={`/board/detailboard?bSeq=${record.bSeq}`}>{text}</Link>
  ),
  },
  {
    title: '조회수',
    dataIndex: 'bCount',
    key: 'bCount',
  },
  {
    title: '작성일',
    dataIndex: 'cdt',
    key: 'cdt',
  },
];

export default function UserBoard() {
  // const [boardData, setBoardData] = useState([]);/
  const [boardDataSec, setBoardDataSec] = useState([]);

  //검색 하기
const { Search } = Input;
const onSearch = (value) =>{
  console.log(value);

  // 검색어(value)에 따른 리스트들 가져오기
    fetch(`${PORT}/userBoard/searchByText?Text=${value}`, {
      method: "get",
    })
      .then((res) => res.json())  // 데이터를 텍스트로 추출
      .then((data) => {
        const boardData = data.data;  // 데이터를 상태에 설정, 첫번째 data는 response의 data, 두번째 data는 Spring ApiResult 클래스의 List 이름이 data

        console.log("데이터 리스트 bSeq : " + boardData[0].cdt);

        const updatedDataSec = boardData.map((boardItem, index) => {

          return {
            key: index,
            bSeq: boardItem.bseq,
            uSeq: boardItem.useq,
            bTitle: boardItem.btitle,
            bCount: boardItem.bcount,
            cdt: boardItem.cdt  ,
          };


        });

        setBoardDataSec(updatedDataSec);

      }); 

} 

//셀렉트 박스 체인지 확인
const handleChange = (value) => {
  console.log(`selected ${value}`);
};


// 버튼 클릭 시 '/registboard' 페이지로 이동
const navigate = useNavigate();
const handleButtonClick = () => {
  console.log("button clicked!");
  navigate('/board/registboard'); 

};

// 전체 리스트 불러오기
  useEffect(() => {
    fetch(`${PORT}/userBoard/selectAllBoard`, {
      method: "get",
    })
      .then((res) => res.json())  // 데이터를 텍스트로 추출
      .then((data) => {
        const boardData = data.data;  // 데이터를 상태에 설정, 첫번째 data는 response의 data, 두번째 data는 Spring ApiResult 클래스의 List 이름이 data

        console.log("데이터 리스트 bSeq : " + boardData[0].cdt);

        const updatedDataSec = boardData.map((boardItem, index) => {

          return {
            key: index,
            bSeq: boardItem.bseq,
            uSeq: boardItem.useq,
            bTitle: boardItem.btitle,
            bCount: boardItem.bcount,
            cdt: boardItem.cdt  ,
          };


        });

        setBoardDataSec(updatedDataSec);

      });
  }, []);

  //페이징 사이즈 설정
  const [pageSize, setPageSize] = useState(5);
  const [bottom, setBottom] = useState('bottomCenter');

  return (

    <div>
      <ul style={{ listStyleType: 'none' }}>
        <li>
          <h1>회원 게시판 </h1>
        </li>
        <li className="registButton">
          <Button onClick={handleButtonClick}>글 작성하기</Button>
        </li>
        <li>
          <Table
            columns={columns}
            dataSource={boardDataSec}
            pagination={{
              position: [bottom]
              , pageSize: [pageSize]
              ,
            }} />
        </li>
        <li className="liStyles">
          <Space wrap>
            <Select
              defaultValue="전체"
              style={{
                width: 80,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'searchTitleText',
                  label: '제목',
                },
                {
                  value: 'searchWriterText',
                  label: '작성자',
                },

              ]}
            />

            <Search
              placeholder="뭐"
              allowClear
              enterButton="검색"
              size="large"
              onSearch={onSearch}
              className="suffix"
            />

          </Space>
        </li>
      </ul>
    </div>



  )

}
