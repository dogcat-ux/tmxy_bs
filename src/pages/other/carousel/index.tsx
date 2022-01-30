import  { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Carousel,
  Descriptions,
  Empty,
  Image,
  message,
  Popconfirm,
  Select,
  Space,
  Tag,
  Upload,
} from 'antd';
import styles from './index.less';
import { carousels, creatCarousels, deleteCarousels } from '@/services/carousels';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons/lib';
import feedBack from '@/utils/apiFeedback';

const TheCarousel = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [file, setFile] = useState();
  const [value, setValue] = useState<number>();
  const [items, setItems] = useState<API.carouselsResItem[]>();
  const sendApi = async () => {
    const { data } = await carousels();
    setItems(data?.item);
  };
  const handleChange = (val: number) => {
    setValue(val);
  };
  useEffect(() => {
    sendApi();
  }, []);
  const deleteData = async () => {
    if (value) {
      const res = await deleteCarousels(value);
      feedBack(res, '删除成功', '删除失败');
      sendApi();
    }
  };
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const beforeUpload = (file: any) => {
    //控制上传图片格式
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.warn('请上传jpg/png图片格式！');
      return false;
    }
    if (!isLt2M) {
      message.warn('请上传小于2M的图片！');
      return;
    }
    if (isJpgOrPng && isLt2M) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      getBase64(file, (imageUrl: any) => {
        // setLoading(false);
        setImageUrl(imageUrl);
      });
      setFile(file);
    }
    return false;
  };
  const onUpload = async () => {
    console.log(file);
    const res=await creatCarousels({ file });
    feedBack(res, '上传成功', '上传失败');
  };
  return (
    <PageContainer>
      <Card className={styles.scoped}>
        <Space>
          <div className="carousel-box">
            <div className="carousel-main">
              <Carousel autoplay>
                {items && items.length > 0 ? (
                  items?.map((value: any) => {
                    return (
                      <div>
                        <div className="home_content">
                          <Tag color="processing">id:{value?.id}</Tag>
                          <Image
                            src={value?.img_path || ''}
                            width={375}
                            height={200}
                            className="img"
                          />

                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Empty/>
                )}
              </Carousel>
            </div>
          </div>
          <div>
            {/*// @ts-ignore*/}
            <ImgCrop rotate shape="rect" aspect={375 / 200}>
              <Upload
                listType="picture-card"
                className="cover_img"
                showUploadList={false}
                beforeUpload={beforeUpload}
                // onChange={handleChange}
                accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                {imageUrl ? (
                  <img src={imageUrl} className="cover_img" alt="img"/>
                ) : (
                  <PlusOutlined/>
                )}
              </Upload>
            </ImgCrop>
          </div>
          <Button type="primary" onClick={onUpload} size="large">
            上传
          </Button>
        </Space>
        <div>
          <Descriptions bordered>
            <Descriptions.Item label="删除轮播图(选择id)">
              <Space>
                <Select style={{ width: 120 }} onChange={handleChange}>
                  {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                  {items?.map((value: any) => {
                    return (
                      // @ts-ignore
                      <Option value={value.id} key={value.id}>{value.id}</Option>
                    );
                  })}
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
        </div>
      </Card>
    </PageContainer>
  );
};

export default TheCarousel;
