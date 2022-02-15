import  { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Card, Col, DatePicker, Row, Select} from 'antd';
import { creatSemester, getSemester } from '@/services/semester';
import feedBack from '@/utils/apiFeedback';
import {dateChange, toTimeStamp} from '@/utils/dateChange';
import CommonTable from "@/components/CommonTable";
import AddForm from "@/components/addForm";
import {useModel} from "@@/plugin-model/useModel";

const { Option } = Select;
const { RangePicker } = DatePicker;
const TheSemester = () => {
  const { setTotal} = useModel('commonTable');
  const [semesters, setSemesters] = useState<API.semesterResItem[]>();
  const [loading,setLoading]=useState(false)
  const getSemesters = async () => {
    setLoading(true);
    // @ts-ignore
    const { data: { item,total } } = await getSemester();
    setLoading(false)
    setTotal(total)
    setSemesters(item);
  };
  const onAddSubmit = async (data: any) => {
    const { semester, year, time } = data;
    const res = await creatSemester({
      end_time: toTimeStamp(time[1]), start_time: toTimeStamp(time[0]),
      semester: parseInt(year.year().toString() + semester),
    });
    feedBack(res, '创建学期成功', '创建学期失败');
    getSemesters();
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
      rules: [{ required: true }],
      children: (<DatePicker style={{ width: 140 }} picker="year"/>),
    },
    {
      label: '学期',
      name: 'semester',
      rules: [{ required: true }],
      children: (<Select style={{ width: 140 }}>
          <Option value="01">01</Option>
          <Option value="02">02</Option>
        </Select>
      ),
    },
    {
      label: '学期起止时间',
      name: 'time',
      rules: [{ required: true }],
      children: (<RangePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
      />),
    },

  ];
  useEffect(() => {
    getSemesters();
  }, []);
  return (
    <PageContainer>
      <Card>
        {/*<Descriptions bordered>*/}
        {/*  <Descriptions.Item label="所有学期"> <Select style={{ width: 120 }}>*/}
        {/*    {*/}
        {/*      // eslint-disable-next-line @typescript-eslint/no-shadow*/}
        {/*      semesters?.map((value, index: number) => {*/}
        {/*        // @ts-ignore*/}
        {/*        return <Option value={value.id} key={index}>{value.semester}</Option>;*/}
        {/*      })*/}
        {/*    }*/}
        {/*  </Select></Descriptions.Item>*/}
        {/*  <Descriptions.Item label="创建学期"><AddForm buttonString="创建学期" formData={AddForms}*/}
        {/*                                           onFinish={onAddSubmit}/></Descriptions.Item>*/}
        {/*</Descriptions>*/}
        <Row className="theme-margin-bottom">
          <Col span={5}>
            <AddForm formData={forms} onFinish={onAddSubmit} buttonString="添加学期"/>
          </Col>
        </Row>
        <CommonTable columns={columns} dataSource={semesters||[]} loading={loading} sendApi={getSemesters}
                     // body={timeInfo ? { time_stamp: timeInfo } : null}
                     isAction={false}
                     onFinish={onAddSubmit}
        />
      </Card>
    </PageContainer>
  );
};

export default TheSemester;
