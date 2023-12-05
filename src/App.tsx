import { useState } from "react";
import { Row, Col, Layout, Typography, Input, Button, Space } from "antd";
import { Clock } from "./components";
import { formatTime, transformTime, validateTime } from "./utils";
import { calculateTimeDifference } from "./utils/util";
import "./App.css";
const { Header, Footer, Content } = Layout;

const offset = 1 * 60 * 60 * 1000 + 15 * 60 * 1000 + 30 * 1000;
function App() {
  const [showError, setShowError] = useState(false);
  const [manualTime, setManualTime] = useState("00:00:00");
  const [firstManualTime, setFirstManualTime] = useState("00:00:00");

  const handleSetTime = () => {
    if (validateTime(manualTime)) {
      console.log("IS valid TIME", manualTime);
      setFirstManualTime(manualTime);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleManualTimeChange = (newTime: string) => {
    if (validateTime(newTime)) {
      setManualTime(newTime);
    }
  };

  const getSecondClockTime = (): Date => {
    // 1 hour, 15 minutes, 30 seconds
    const newTime = new Date(transformTime(firstManualTime));
    return new Date(newTime.getTime() + offset);
  };

  const secondClockTimeOffset = getSecondClockTime();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "50px",
        }}
      >
        <Typography.Title level={1} style={{ color: "white", margin: 0 }}>
          Wall Clock Sync
        </Typography.Title>
      </Header>
      <Content>
        <div className="container">
          <Row justify="center" align="top">
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Clock
                manualTime={firstManualTime}
                onUpdateManualTime={handleSetTime}
              />
              <Space
                direction="vertical"
                size={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Input
                  placeholder="00:00:00"
                  onChange={(e: { target: { value: string } }) =>
                    handleManualTimeChange(e.target.value)
                  }
                  value={manualTime}
                />
                <Button type="primary" onClick={() => handleSetTime()}>
                  Set Time
                </Button>
                {showError && (
                  <p style={{ color: "red" }}>
                    Invalid time format, please enter hh:mm:ss
                  </p>
                )}
              </Space>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <Clock
                manualTime={formatTime(secondClockTimeOffset)}
                onUpdateManualTime={handleSetTime}
              />
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <p>
                TIME DIFF:
                <strong>
                  {calculateTimeDifference(
                    firstManualTime,
                    formatTime(secondClockTimeOffset)
                  )}
                </strong>
              </p>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer>@DDiscua</Footer>
    </Layout>
  );
}

export default App;
