import { httpGetGuide } from "@/services/api/requests/auth.requests";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const { Meta } = Card;

const Styled = styled.div`
  .ant-card {
    .ant-card-cover {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 50%;
      }
    }
    .ant-card-body {
      padding: 20px;
      padding-top: 10px;
    }
  }
`;

const GuidePage = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["guide"],
    queryFn: httpGetGuide,
    select: (response) => response.data,
  });

  return (
    <Styled>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={24}>
          <Card>
            <Meta
              title={"SMART TIZIM"}
              description={t("Ushbu dastur orqali biznesingizni boshqaring !")}
            />
          </Card>
        </Col>

        {data?.map((item, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              loading={isLoading}
              style={{ height: "100%" }}
              hoverable={true}
              cover={
                isLoading ? (
                  <Skeleton.Node active={isLoading}>
                    <PlayCircleOutlined
                      style={{
                        fontSize: 40,
                        color: "#bfbfbf",
                      }}
                    />
                  </Skeleton.Node>
                ) : (
                  <iframe
                    width="560"
                    height="315"
                    src={item.link}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    
                    
                  />
                )
              }
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </Styled>
  );
};

export default GuidePage;
