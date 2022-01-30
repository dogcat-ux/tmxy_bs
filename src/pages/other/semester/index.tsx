import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, DatePicker, Descriptions, Select } from 'antd';
import AddForm from '@/components/addForm';
import { creatSemester, getSemester } from '@/services/semester';
import feedBack from '@/utils/apiFeedback';
import { toTimeStamp } from '@/utils/dateChange';

const { Option } = Select;
const { RangePicker } = DatePicker;
const TheSemester = () => {
  const [semesters, setSemesters] = useState<API.semesterResItem[]>();
  const getSemesters = async () => {
    // @ts-ignore
    const { data: { item } } = await getSemester();
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
  const AddForms = [
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
        <Descriptions bordered>
          <Descriptions.Item label="所有学期"> <Select style={{ width: 120 }}>
            {
              // eslint-disable-next-line @typescript-eslint/no-shadow
              semesters?.map((value, index: number) => {
                // @ts-ignore
                return <Option value={value.id} key={index}>{value.semester}</Option>;
              })
            }
          </Select></Descriptions.Item>
          <Descriptions.Item label="创建学期"><AddForm buttonString="创建学期" formData={AddForms}
                                                   onFinish={onAddSubmit}/></Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default TheSemester;
