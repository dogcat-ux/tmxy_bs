import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons/lib';
import feedBack from '@/utils/apiFeedback';
import React from 'react';


const UpLoadFile: React.FC<{ senApi: (file: any) => void }> = ({ senApi }) => {
  const FileProps = {
    name: 'file',
    accept: '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    multiple: true,
    maxCount: 1,
    beforeUpload: () => {
      return false;
    },
    action: '',
    async onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        // const res = await senApi(info.file[0].originFileObj);
        const res = await senApi(info.file);
        feedBack(res, `${info.file.name} 文件上传成功.`, `${info.file.name} 文件上传失败.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <div>
      <Upload {...FileProps}>
        <Button icon={<UploadOutlined/>}>导入</Button>
      </Upload>
    </div>
  );
};

export default UpLoadFile;
