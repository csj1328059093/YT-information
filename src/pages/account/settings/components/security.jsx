import React from 'react';
import {List} from 'antd';
import {useModel} from 'umi'

const passwordStrength = {
  ok: <span className="strong">强</span>,
  pass: <span className="medium">中</span>,
  poor: <span className="weak">弱</span>,
};

const SecurityView = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState
  const {passScore, phone} = currentUser
  const getData = () => [
    {
      title: '账户密码',
      description: (
        <>
          当前密码强度：
          {passwordStrength[passScore]}
        </>
      ),
      actions: [<a key="Modify" href={'/user/updateMsg'}>修改</a>],
    },
    {
      title: '账户手机',
      description: `已绑定手机：${phone.substring(0, 3)}****${phone.substring(7, 11)}`,
      // actions: [<a key="Modify">修改</a>],
    },
    // {
    //   title: '密保问题',
    //   description: '未设置密保问题，密保问题可有效保护账户安全',
    //   actions: [<a key="Set">设置</a>],
    // },
    // {
    //   title: '备用邮箱',
    //   description: `已绑定邮箱：ant***sign.com`,
    //   actions: [<a key="Modify">修改</a>],
    // },
    // {
    //   title: 'MFA 设备',
    //   description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    //   actions: [<a key="bind">绑定</a>],
    // },
  ];

  const data = getData();
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description}/>
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
