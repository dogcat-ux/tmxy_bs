import  {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Col, DatePicker, Row, Select} from 'antd';
import {creatSemester, getSemester, putSemester} from '@/services/semester';
import feedBack from '@/utils/apiFeedback';
import {dateChange, toTimeStamp} from '@/utils/dateChange';
import CommonTable from "@/components/CommonTable";
import AddForm from "@/components/addForm";
import {useModel} from "@@/plugin-model/useModel";
import moment from "moment";

const {Option} = Select;
const {RangePicker} = DatePicker;
const TheSemester = () => {
  const [id,setId]=useState(-1);
  const {setTotal, editData} = useModel('commonTable');
  const [semesters, setSemesters] = useState<API.semesterResItem[]>();
  const [loading, setLoading] = useState(false)
  const getSemesters = async () => {
    setLoading(true);
    // @ts-ignore
    const {data: {item, total}} = await getSemester();
    setLoading(false)
    setTotal(total)
    setSemesters(item);
  };
  const onAddSubmit = async (data: any) => {
    const {semester, year, time} = data;
    console.log("year",year)
    const res = await creatSemester({
      end_time: toTimeStamp(time[1]), start_time: toTimeStamp(time[0]),
      semester: parseInt(year.year().toString() + semester),
    });
    feedBack(res, '创建学期成功', '创建学期失败');
    getSemesters();
  };
  const amendSubmit = async (data: any) => {
    const {year,semester, time} = data;
    const res = await putSemester(editData?.activity_semester_id||id,{
      end_time: toTimeStamp(time[1]),
      start_time: toTimeStamp(time[0]),
      semester: parseInt(year.year().toString() + semester),
    });
    feedBack(res, '修改学期成功', '修改学期失败');
    getSemesters();
  };
  const onAmend = (record: any) => {
    setId(record?.activity_semester_id)
  };
  const columns = [
    {
      title: '学年',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '学期',
      dataIndex: 'semester',
      key: 'semester',
    },
    {
      title: '学期开始时间',
      key: 'start_time',
      render: (accord: API.semesterResItem) => <>{dateChange(accord?.start_time)}</>,
    },
    {
      title: '学期结束时间',
      key: 'end_time',
      render: (accord: API.semesterResItem) => <>{dateChange(accord?.end_time)}</>,
    },
  ];
  const forms = [
    {
      label: '学年',
      name: 'year',
      rules: [{required: true}],
      children: (<DatePicker style={{width: 140}} picker="year"/>),
    },
    {
      label: '学期',
      name: 'semester',
      rules: [{required: true}],
      children: (<Select style={{width: 140}}>
          <Option value="01">01</Option>
          <Option value="02">02</Option>
        </Select>
      ),
    },
    {
      label: '学期起止时间',
      name: 'time',
      rules: [{required: true}],
      children: (<RangePicker
        showTime={{format: 'HH:mm'}}
        format="YYYY-MM-DD HH:mm"
      />),
    },

  ];
  useEffect(()=>{
    console.log("editData",editData)
  },[editData])
  const formData = [
    {
      label: '学年',
      name: 'year',
      initialValue: moment(dateChange(editData?.start_time)),
      rules: [{required: true}],
      children: (<DatePicker style={{width: 140}} picker="year"/>),
    },
    {
      name: 'semester',
      label: "学期",
      // initialValue: parseInt(editData?.semester.toString().slice(4,6)),
      initialValue: editData?.semester.toString().slice(4,6),
      rules: [{required: true}],
      children: (<Select style={{width: 140}}>
        <Option value="01">01</Option>
        <Option value="02">02</Option>
      </Select>)
    },
    {
      label: '学期起止时间',
      name: 'time',
      rules: [{required: true}],
      initialValue: [moment(dateChange(editData?.start_time)), moment(dateChange(editData?.end_time))],
      children: (<RangePicker
        showTime={{format: 'HH:mm'}}
        format="YYYY-MM-DD HH:mm"
      />),
    },

  ]
  useEffect(() => {
    getSemesters();
  }, []);
  return (
    <PageContainer>
      <Card>
        <Row className="theme-margin-bottom">
          <Col span={5}>
            <AddForm formData={forms} onFinish={onAddSubmit} buttonString="添加学期"/>
          </Col>
        </Row>
        <CommonTable columns={columns} dataSource={semesters || []} loading={loading} sendApi={getSemesters}
                     isAction={true}
                     formData={formData}
                     isDelete={false}
                     isLook={false}
                     onAmend={onAmend}
                     onFinish={amendSubmit}
        />
      </Card>
    </PageContainer>
  );
};

export default TheSemester;
