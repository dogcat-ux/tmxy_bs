import { useEffect, useState } from 'react';
import { category, creatCategory, deleteCategory } from '@/services/category';
import { Button, Card, Descriptions, Input, Popconfirm, Select, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import AddForm from '@/components/addForm';
import feedBack from '@/utils/apiFeedback';

const TheCategory = () => {
  const [categorys, setCategorys] = useState<API.categoryItem[]>();
  const [value, setValue] = useState<number>();
  const getCategorys = async () => {
    // @ts-ignore
    const { data: { item } } = await category();
    setCategorys(item);
  };
  const handleChange = (data: number) => {
    setValue(data);
  };
  const deleteData = async () => {
    if (value) {
      const res = await deleteCategory(value);
      feedBack(res, '删除成功', '删除失败');
      getCategorys();
    }
  };
  const onAddSubmit = async (data: any) => {
    const res = await creatCategory({ ...data });
    feedBack(res, '创建分类成功', '创建分类失败');
    getCategorys();
  };
  useEffect(() => {
    getCategorys();
  }, []);
  const AddForms = [
    {
      label: '分类名称',
      name: 'category_name',
      rules: [{ required: true }],
      children: (<Input/>),
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Descriptions bordered>
          <Descriptions.Item label="所有活动分类"> <Select style={{ width: 120 }}>
            {
              // eslint-disable-next-line @typescript-eslint/no-shadow
              categorys?.map((value, index: number) => {
                // @ts-ignore
                return <Select.Option value={value.id} key={index}>{value.category_name}</Select.Option>;
              })
            }
          </Select></Descriptions.Item>
          <Descriptions.Item label="创建分类"><AddForm buttonString="创建分类" formData={AddForms}
                                                   onFinish={onAddSubmit}/></Descriptions.Item>
          <Descriptions.Item label="删除分类">
            <Space>
              <Select style={{ width: 120 }}
                      onChange={handleChange}>
                {
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  categorys?.map((value: any) => {
                    // @ts-ignore
                    return <Select.Option value={value.id} key={value.id}>{value.category_name}</Select.Option>;
                  })
                }
              </Select>
              <Popconfirm
                title="确定删除吗?"
                onConfirm={deleteData}
                okText="确实"
                cancelText="取消"
              >
                <Button type="primary">删除</Button>
              </Popconfirm>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default TheCategory;
