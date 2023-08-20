import React from 'react';
import { PORT } from '../../set';
import { useEffect, useState, useNavigate } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Space, List, Avatar, Form } from 'antd';

const { TextArea } = Input;

const Comment = (props) => {

	//댓글 상태 저장
	const [commentDataSec, setCommentDataSec] = useState([]);

  // 댓글 등록 상태 변경
  const [registSuccess, setRegistSuccess] = useState(0);

	// 넘어와야될 데이터들 : bSeq, uSeq(댓글 작성할때 필요)
	const {bSeq, uSeq} = props.data;

  // 등록 인풋 폼 리셋 위한 객체
  const [form] = Form.useForm();

	console.log("comment js 넘어와서!! : " + bSeq);

	// fetch로 bSeq를 써서 그 게시물 번호에 따른 댓글리스트 가져오기
	useEffect(() => {
		fetch(`${PORT}/commentBoard/selectBoardComment?bSeq=${bSeq}`, {
			method: "get",
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("서버에서 데이터를 가져오는데 문제가 발생했습니다.");
				}
				return res.json();
			}
			)  // 데이터를 텍스트로 추출
			.then((data) => {

				console.log(data);

				if (data.data != null) {
					const boardData = data.data;  // 데이터를 상태에 설정, 첫번째 data는 response의 data, 두번째 data는 Spring ApiResult 클래스의 List 이름이 data

					console.log("댓글 리스트 " + boardData[0].ccontents);

					const updatedDataSec = boardData.map((boardItem, index) => {

						return {
							key: index,
							cSeq: boardItem.cseq,
							bSeq: boardItem.bseq,
							uSeq: boardItem.useq,
							cContents: boardItem.ccontents,
							cdt: boardItem.cdt,
						};


					});

					setCommentDataSec(updatedDataSec);
					setRegistSuccess(0);

				}else{

					console.log("댓글이 존재하지 않습니다");
				}

			});


	}, [registSuccess]);

    console.log("전체 길이"+commentDataSec.length);

	//가져온 댓글 리스트로 뿌려질 데이터
	const data = Array.from({

		length: commentDataSec.length,
	  }).map((_, i) => ({

		  key: commentDataSec[i].key,
		  bContents: commentDataSec[i].cContents,
		  description:
		  "순번 : " + commentDataSec[i].cSeq + " 작성자 : " + commentDataSec[i].uSeq ,
		  cdt: commentDataSec[i].cdt  ,
		  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
	  }));

	  const IconText = ({ icon, text }) => (
		<Space>
		  {React.createElement(icon)}
		  {text}
		</Space>
	  );

  // 댓글 등록하기
  // submit 된 데이터들 values로 넘어옴 
  const onFinish = (values) => {
    console.log(values);

    // values 객체를 서버로 전송하는 fetch 호출
    fetch(`${PORT}/commentBoard/registComment`, {
      method: "post", // POST 요청으로 변경 (또는 필요한 HTTP 메서드로 변경)
      headers: {
        "Content-Type": "application/json", // 전송할 데이터의 형식을 지정
      },
      body: JSON.stringify({
        bseq: bSeq,
        useq: uSeq, 
        ccontents: values.cContents,
      }), // values 객체를 JSON 문자열로 변환하여 전송
    })
      .then((res) => res.json())
      .then((data) => {


        console.log("등록 Status : " + data.result);
        let result = data.result;
        if (result === "SUCCESS") {
          setRegistSuccess(1);
          form.resetFields();
        }
      });
  };

	return (
		<div>
			{/* 댓글 리스트 불러오기 */}
			<List
				itemLayout="vertical"
				size="large"
				pagination={{
					onChange: (page) => {
						console.log(page);
					},
					pageSize: 3,
				}}
				dataSource={data}
				renderItem={(item) => (
					<List.Item
						key={item.title}
						actions={[
							<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
							<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
						]}

					>
						<List.Item.Meta
							avatar={<Avatar src={item.avatar} />}
							description={item.description}
						/>
						{item.bContents}
					</List.Item>
				)}
			/>

			{/* 댓글 입력하기 */}
			{/* <Divider orientation="left" orientationMargin="0" style={{backgroundColor:'lightgray'}} /> */}

			<br></br>

      <Form
        name="nest-messages"
        form={form}
        onFinish={onFinish}
      >

        <Form.Item name="cContents">
        <Input.TextArea rows={4} placeholder="댓글을 입력하세요." maxLength={200} style={{ width: '100%' }} />
        </Form.Item>

        <Space direction="vertical" style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          marginTop: '10px'
        }}>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              댓글달기
            </Button>
          </Form.Item>
        </Space>



      </Form>
		</div>
	);
};

export default Comment;