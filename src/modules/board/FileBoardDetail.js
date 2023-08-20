import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PORT } from "../../set";
import { Card, Divider, Typography, Button, Space } from "antd"; // Import Button component
import { LikeOutlined } from "@ant-design/icons";
import "./FileBoardDetail.css";

/**
 * 박은빈
 * 파일게시판 상세조회
 * 파일 다운로드
 * 파일 삭제
 */

const FileBoardDetail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bSeq = params.get("bSeq");
  const navigate = useNavigate();

  const [item, setItem] = useState({});
  const { Title, Text } = Typography;

  const [liked, setLiked] = useState(0);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const BackToList = () => {
    navigate("/board/fileBoard");
  };

  const DeleteButton = () => {
    fetch(`${PORT}/board/deleteFileBoard?bSeq=${bSeq}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "SUCCESS") {
          alert("삭제가 완료되었습니다.");
          navigate("/board/fileBoard");
        }
      });
  };

  const likeClick = () => {
    fetch(`${PORT}/board/likeBoard?bSeq=${bSeq}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked((prevLiked) => prevLiked + 1);
      });

  };
  
  // 조회수 올리기
  useEffect(() => {
    fetch(`${PORT}/board/updateView?bSeq=${bSeq}`, {
      method: "get",
    })
      .then((res) => res.json())  // 데이터를 텍스트로 추출
      .then((data) => {
        // console.log("View update complete!");
      });
  }, []);

  useEffect(() => {
    fetch(`${PORT}/board/fileBoardDetail?bSeq=${bSeq}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const boardData = data.voData;
        setItem(boardData);
      });
  }, [liked]);

  const handleDownload = () => {
    window.location.href = `${PORT}/board/downloadFile?bSeq=${bSeq}`;
  };

  return (
    <div>
      <Card>
        <Title level={2}>{item.btitle}</Title>
        <Text className="author">작성자: {item.useq}</Text>
        <Divider />
        <div className="info-container">
          <div className="left-info">
            <Text>작성날짜: {item.cdt}</Text>
          </div>
          <div className="right-info">
            <Text>조회수: {item.bcount}</Text>
          </div>
        </div>
        <Divider />
        <Text>{item.bcontents}</Text> 
        {item.bfileOriginNm && (
          <Button type="primary" onClick={handleDownload}>
            파일 다운로드
          </Button>
        )}
      </Card>
      <p>
        <a href="#" onClick={likeClick}>
          <IconText
            icon={LikeOutlined}
            text={item.liked}
            key="list-vertical-like-o"
          />
        </a>
      </p>
      <Button onClick={BackToList}>돌아가기</Button>
      <Button onClick={DeleteButton}>삭제</Button>
    </div>
  );
};

export default FileBoardDetail;
