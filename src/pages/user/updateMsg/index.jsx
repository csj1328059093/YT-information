import React, {useState, useEffect} from 'react';
import {Form, Button, Col, Input, Popover, Progress, Row, Select, message} from 'antd';
import {Link, useRequest, history, useModel} from 'umi';
import zxcvbn from 'zxcvbn';
import {fakeRegister, checkSendNote} from './service';
import styles from './style.less';
import {setLocalStorage, getLocalStorage} from '@/utils/localStorage'
import Footer from "@/components/Footer";

const FormItem = Form.Item;
const {Option} = Select;
const InputGroup = Input.Group;
const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <span>强度：强</span>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <span>强度：中</span>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <span>强度：弱</span>
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [prefix, setPrefix] = useState('86');
  const [popover, setPopover] = useState(false);
  const confirmDirty = false;
  let interval;
  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const {loading: sendNoteLoading, run: sendNote} = useRequest(checkSendNote, {
    manual: true,
    onSuccess: (data, params) => {
      message.success(data);
      runTime();
    },
  });

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({...s, currentUser: userInfo}));
    }
  };

  const onGetCaptcha = () => {
    const phone = document.getElementById('phoneInput').value;
    sendNote({phone});
  };

  const runTime = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);

      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    let value = form.getFieldValue('password') ? form.getFieldValue('password') : '';
    let score = zxcvbn(value).guesses_log10;

    if (value && score > 8 && value.length >= 6) {
      return 'ok';
    }

    if (value && score > 4 && value.length >= 6) {
      return 'pass';
    }

    return 'poor';
  };

  const {loading: submitting, run: register} = useRequest(fakeRegister, {
    manual: true,
    onSuccess: async (data, params) => {
      const {msg, sessionId} = data;
      const {phone, username} = params[0];
      message.success(msg);
      setLocalStorage('sessionId', sessionId)
      await fetchUserInfo();
      history.push({
        pathname: '/user/register-result',
        state: {
          phone,
          msg: '修改成功'
        },
      });
    },
  });

  const onFinish = (values) => {
    const passScore = getPasswordStatus()
    register({...values, passScore});
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      // setVisible(!!value);
      return promise.reject('请输入密码!');
    } // 有值的情况

    if (!visible) {
      // setVisible(!!value);
    }

    setPopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const changePrefix = (value) => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    let value = form.getFieldValue('password') ? form.getFieldValue('password') : '';
    const score = zxcvbn(value).guesses_log10;
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={score * 10 > 100 ? 100 : score * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <div style={{width: 336, margin: '0 auto', flex: 1}}>
        <h1>修改密码</h1>
        <Form form={form} name="UserRegister" onFinish={onFinish}>
          <InputGroup compact>
            <FormItem
              style={{
                width: '100%',
              }}
              name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
                {
                  pattern:
                    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                  message: '手机号格式错误!',
                },
              ]}
            >
              <Input id={'phoneInput'} size="large" placeholder="手机号(发布信息唯一绑定联系方式)"/>
            </FormItem>
          </InputGroup>
          <Row gutter={8}>
            <Col span={16}>
              <FormItem
                name="code"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码!',
                  },
                ]}
              >
                <Input size="large" placeholder="验证码"/>
              </FormItem>
            </Col>
            <Col span={8}>
              <Button
                size="large"
                disabled={!!count}
                loading={sendNoteLoading}
                className={styles.getCaptcha}
                onClick={onGetCaptcha}
              >
                {sendNoteLoading ? '' : count ? `${count} s` : '获取验证码'}
              </Button>
            </Col>
          </Row>
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode;
              }
              return node;
            }}
            content={
              visible && (
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              )
            }
            overlayStyle={{
              width: 240,
              // top: 170
            }}
            placement="top"
            visible={visible}
          >
            <FormItem
              name="password"
              className={
                form.getFieldValue('password') &&
                form.getFieldValue('password').length > 0 &&
                styles.password
              }
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            >
              <Input
                onBlur={() => {
                  setVisible(false);
                }}
                onFocus={() => {
                  setVisible(true);
                }}
                size="large"
                type="password"
                placeholder="至少6位新密码，区分大小写"
              />
            </FormItem>
          </Popover>
          {/*<div style={{marginTop: 140}}></div>*/}
          <FormItem
            name="confirm"
            rules={[
              {
                required: true,
                message: '确认新密码',
              },
              {
                validator: checkConfirm,
              },
            ]}
          >
            <Input size="large" type="password" placeholder="确认密码"/>
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span>修改密码</span>
            </Button>
            <Link className={styles.login} to="/user/login">
              <span>使用已有账户登录</span>
            </Link>
          </FormItem>
        </Form>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
