import {Avatar, Card, Col, List, Skeleton, Row, Statistic, Button, Modal, Input} from 'antd';
import {Radar} from '@ant-design/charts';
import {history, Link, useModel, useRequest} from 'umi';
import {PageContainer} from '@ant-design/pro-layout';
import {FilterOutlined, FormOutlined, QrcodeOutlined, WechatOutlined} from '@ant-design/icons'
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import {queryProjectNotice, queryActivities, fakeChartData} from './service';
import React, {useState} from 'react';
import {getLocalStorage} from '@/utils/localstorage';
import gzh from './img/gzh.png'
import kf from './img/kf.png'
import ProForm, {
  ProFormText,
  QueryFilter,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  LightFilter, ProFormCascader
} from "@ant-design/pro-form";
import city from "@/utils/city";
import worktype from "@/utils/worktype";

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

const PageHeaderContent = ({currentUser}) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar}/>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          你好，
          {currentUser.username ? currentUser.username : '陌生人'}
          ，祝你开心每一天！
        </div>
        {/*<div>*/}
        {/*  {currentUser.title} |{currentUser.group}*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="项目数" value={56}/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="团队内排名" value={8} suffix="/ 24"/>
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223}/>
    </div>
  </div>
);

const filter = () => {

}

const Workplace = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgType, setImgType] = useState(false);
  const [reflashkey, setReflashkey] = useState(0);
  const [filterParmas, setFilterParmas] = useState({});
  const [searchText, setSearchText] = useState('');
  const {loading: projectLoading, data: projectNotice = []} = useRequest(() => {
    return queryProjectNotice({searchText})
  }, {
    refreshDeps: [reflashkey],
  });
  const {currentUser} = initialState ?? {}
  return (

    <PageContainer
      content={
        <>
          <div style={{marginBottom: 10}}>
            获取工作信息，通过联系方式沟通。
          </div>
          <div style={{color: 'red'}}>
            信息来源于用户，谨防上当受骗。
          </div>
        </>
      }
      // content={
      //   <PageHeaderContent
      //     currentUser={currentUser ? currentUser : {
      //       avatar: '/unlogin.png',
      //     }}
      //   />
      // }
      // extraContent={<ExtraContent />}
    >
      <Input.Search
        placeholder="请输入"
        enterButton="搜索"
        size="large"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onSearch={(e) => {
          setReflashkey(reflashkey + 1)
        }}
        style={{maxWidth: 522, width: '100%', marginBottom: 10}}
      />
      <Row gutter={24}>
        {/*<LightFilter*/}
        {/*  onFinish={(values) => {*/}
        {/*    setFilterParmas(values)*/}
        {/*    setReflashkey(reflashkey + 1);*/}
        {/*  }}*/}
        {/*  style={{*/}
        {/*    backgroundColor: 'white',*/}
        {/*    position: 'absolute',*/}
        {/*    zIndex: 1,*/}
        {/*    left: 50,*/}
        {/*    top: 12,*/}
        {/*    color: '#3F8BFE'*/}
        {/*  }}*/}
        {/*  collapse*/}
        {/*  collapseLabel={*/}
        {/*    <div>*/}
        {/*      <FilterOutlined/>*/}
        {/*      <span style={{marginLeft: 5}}>*/}
        {/*        筛选*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*  }*/}
        {/*  // footerRender={false}*/}
        {/*>*/}
        {/*  <ProFormRadio.Group*/}
        {/*    options={[*/}
        {/*      {*/}
        {/*        value: '1',*/}
        {/*        label: '招工',*/}
        {/*      },*/}
        {/*      {*/}
        {/*        value: '2',*/}
        {/*        label: '找工作',*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*    label="信息类型"*/}
        {/*    name="msgType"*/}
        {/*  />*/}
        {/*  <ProFormSelect*/}
        {/*    options={worktype}*/}
        {/*    name="workType"*/}
        {/*    label="工种"*/}
        {/*  />*/}
        {/*  <ProFormCascader*/}
        {/*    request={async () => city}*/}
        {/*    name="area"*/}
        {/*    label="地区"*/}
        {/*  />*/}
        {/*</LightFilter>*/}
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            style={{
              marginBottom: 24,
            }}
            // title="最新消息"
            bordered={false}
            extra={
              <div
                style={{color: '#3F8BFE'}}
                onClick={() => {
                  setReflashkey(reflashkey + 1);
                }}
              >
                刷新
              </div>
            }
            loading={projectLoading}
            bodyStyle={{
              padding: 0,
            }}
          >
            {projectNotice.map((item) => {
              const {id, member, content, updatedAt, type, msgType, workType, area} = item
              return (
                <Card.Grid className={styles.projectGrid} key={id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      // title={
                      //   <div className={styles.cardTitle}>
                      //     {/*<Avatar size="small" src={item.logo} />*/}
                      //     <Link to={item.href}>{item.username}</Link>
                      //   </div>
                      // }
                    />
                    <div>{type === 1 ? `${msgType}，${area}，${workType}，${content}` : content}</div>
                    <div className={styles.projectItemContent}>
                      <a
                        href={`tel:${member}`}>{`${member.substring(0, 3)}****${member.substring(7, 11)} 点击快速拨号` || '该用户无联系方式'}</a>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                        {moment(updatedAt).fromNow()}
                      </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              )
            })}
          </Card>
        </Col>
      </Row>
      <div onClick={() => {
        history.push({
          pathname: '/info/issuework',
        });
      }} className={styles.rightIcon} style={{bottom: 250}}>
        <FormOutlined style={{fontSize: '30px', color: 'white'}}/>
        <div style={{color: 'white'}}>发布信息</div>
      </div>
      <div
        onClick={() => {
          setIsModalVisible(true)
          setImgType(true)
        }}
        className={styles.rightIcon}
        style={{bottom: 150}}>
        <QrcodeOutlined style={{fontSize: '30px', color: 'white'}}/>
        <div style={{color: 'white'}}>公众号</div>
      </div>
      <div
        onClick={() => {
          setIsModalVisible(true)
          setImgType(false)
        }}
        className={styles.rightIcon}
        style={{bottom: 50}}>
        <WechatOutlined style={{fontSize: '30px', color: 'white'}}/>
        <div style={{color: 'white'}}>联系我们</div>
      </div>
      <Modal
        footer={[
          <Button key="submit" type="primary" onClick={() => {
            setIsModalVisible(false);
          }}>
            确定
          </Button>,
        ]}
        visible={isModalVisible}
        closable={false}
      >
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {
            imgType ? <img src={gzh} style={{width: '80%'}} alt=""/> : <img src={kf} style={{width: '80%'}} alt=""/>
          }

        </div>
      </Modal>
    </PageContainer>
  );
};

export default Workplace;
