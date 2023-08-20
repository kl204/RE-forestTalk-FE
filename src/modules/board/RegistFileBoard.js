import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { PORT } from "../../set";
import { useNavigate } from "react-router-dom";

/**
 * 박은빈
 * 파일게시판 글작성
 * 파일 업로드
 */

const RegistFileBoard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    bTitle: "",
    bContents: "",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpload = () => {
    const data = new FormData();
    data.append("bTitle", formData.bTitle);
    data.append("bContents", formData.bContents);
    data.append("bFile", selectedFile);

    fetch(`${PORT}/board/registFileBoard`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.result == "SUCCESS") {
          alert("게시글이 등록되었습니다.");
          navigate("/board/fileBoard");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {/* Form inputs */}
      <Input name="bTitle" onChange={handleInputChange} />
      <Input.TextArea name="bContents" onChange={handleInputChange} />
      <input type="file" onChange={handleFileChange} />

      {/* Upload button */}
      <Button type="primary" onClick={handleUpload}>
        작성
      </Button>
    </div>
  );
};

export default RegistFileBoard;
