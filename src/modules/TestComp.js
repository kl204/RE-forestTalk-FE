import { useEffect } from 'react';
import { PORT } from '../set';

const TestCom = () => {

	//const [testStr, setTestStr] = useState("");

	useEffect(() => {
		fetch(`${PORT}/test/test1`, {
			method: "get",
			// res에 결과가 들어옴
		}).then((res) => res.text())
			.then((res) => {
				console.log(res);
			});
	}, []);

	return (
		<>
			<div>테스트 페이지</div>
		</>)
}
export default TestCom;