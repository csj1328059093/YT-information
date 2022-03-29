import {Card, message} from 'antd';
import ProForm, {
  ProFormCascader,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {FormattedMessage, useModel, useRequest} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import {fakeSubmitForm} from './service';
import styles from './style.less';
import city from '@/utils/city'
import worktype from '@/utils/worktype'
import React from "react";

const IssueWork = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const {currentUser = {}} = initialState ? initialState : {}
  const {run} = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: (data, params) => {
      console.log(params)
      message.success('提交成功');
    },
  });

  const onFinish = async (values) => {
    run(values);
  };

  return (
    <PageContainer content="发布工作信息，可以用于招工与找工作">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          initialValues={{
            phone: currentUser.phone,
            msgType: '1'
          }}
          onFinish={onFinish}
        >
          {/*<ProFormDateRangePicker*/}
          {/*  label="起止日期"*/}
          {/*  width="md"*/}
          {/*  name="date"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: '请选择起止日期',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  placeholder={['开始日期', '结束日期']}*/}
          {/*/>*/}
          <ProFormTextArea
            label="内容"
            width="xl"
            name="content"
            rules={[
              {
                required: true,
                message: '请输入具体内容',
              },
              {
                pattern: /^.{0,100}$/,
                message: "字数不允许超过100字",
              },
            ]}
            placeholder="请输入你的找工作的内容或者招工的内容"
          />

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: '招工',
              },
              {
                value: '2',
                label: '找工作',
              },
            ]}
            label="信息类型"
            name="msgType"
          />
          <ProFormCascader
            width="md"
            request={async () => city}
            name="area"
            rules={[
              {
                required: true,
                message: '请选择工作地址',
              },
            ]}
            label="地区"
          />
          <ProFormSelect
            width="md"
            options={worktype}
            name="workType"
            rules={[
              {
                required: true,
                message: '请选择工种',
              },
            ]}
            label="工种"
          />
          <ProFormText
            label="唯一联系方式"
            width="xl"
            name="phone"
            rules={[
              {
                required: true,
                message: '请点击右上角头像按钮进行注册登录',
              },
            ]}
            disabled
            placeholder="注册联系方式后登录才可发布消息"
          />


          {/*<ProFormTextArea*/}
          {/*  label="衡量标准"*/}
          {/*  name="standard"*/}
          {/*  width="xl"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: '请输入衡量标准',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  placeholder="请输入衡量标准"*/}
          {/*/>*/}

          {/*<ProFormText*/}
          {/*  width="md"*/}
          {/*  label={*/}
          {/*    <span>*/}
          {/*      客户*/}
          {/*      <em className={styles.optional}>（选填）</em>*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  tooltip="目标的服务对象"*/}
          {/*  name="client"*/}
          {/*  placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"*/}
          {/*/>*/}

          {/*<ProFormText*/}
          {/*  width="md"*/}
          {/*  label={*/}
          {/*    <span>*/}
          {/*      邀评人*/}
          {/*      <em className={styles.optional}>（选填）</em>*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  name="invites"*/}
          {/*  placeholder="请直接 @姓名／工号，最多可邀请 5 人"*/}
          {/*/>*/}

          {/*<ProFormDigit*/}
          {/*  label={*/}
          {/*    <span>*/}
          {/*      权重*/}
          {/*      <em className={styles.optional}>（选填）</em>*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  name="weight"*/}
          {/*  placeholder="请输入"*/}
          {/*  min={0}*/}
          {/*  max={100}*/}
          {/*  width="xs"*/}
          {/*  fieldProps={{*/}
          {/*    formatter: (value) => `${value || 0}%`,*/}
          {/*    parser: (value) => (value ? value.replace('%', '') : '0'),*/}
          {/*  }}*/}
          {/*/>*/}

        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default IssueWork;
