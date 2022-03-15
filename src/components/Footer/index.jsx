import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '月亮前端开发',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/csj1328059093',
          blankTarget: true,
        },
        {
          key: 'moon-bk',
          title: 'BLOG',
          href: 'https://blog.csdn.net/weixin_43877799',
          blankTarget: true,
        },
      ]}
    />
  );
};
