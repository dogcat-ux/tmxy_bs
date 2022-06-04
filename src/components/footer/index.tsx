import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return <DefaultFooter copyright={`${currentYear}福州大学土木学院`} links={[
    {key:"备案号",title:"桂ICP备2021000337号-2",href:"https://beian.miit.gov.cn/#/Integrated/index"}
  ]}/>;
};

export default Footer;
