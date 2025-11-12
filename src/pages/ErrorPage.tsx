import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Header,
  Logo,
  LogoImage,
  MainContent,
  Footer,
  FooterLinks,
  FooterLink,
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  BackButton,
} from "../styles/StyledComponents";
import clientXLogo from "../assets/clientx-logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ErrorPage: React.FC<{ message?: string }> = ({ message }) => {
  const navigate = useNavigate();

  const { content } = useSelector((state: RootState) => state.content);
  const { themes } = useSelector((state: RootState) => state.theme);

  const getThemeByName = (title: string) => {
    const res =
      themes.find((item) => item.themeName === title)?.themeValue || "";
    console.log("Theme for", title, "is", res);
    return res;
  };

  const getContentByTitle = (title: string) => {
    return content.find((item) => item.title === title)?.text || "";
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container>
      <Header background={getThemeByName("Header background")}>
        <Logo>
          <LogoImage src={clientXLogo} alt="ClientX" />
        </Logo>
      </Header>

      <MainContent>
        <ErrorContainer>
          <ErrorTitle color={getThemeByName("Header_Background")}>
            Something went wrong
          </ErrorTitle>
          <ErrorMessage>
            {message ||
              "We’re having trouble loading this page. It might be a temporary issue, or the page doesn’t exist."}
          </ErrorMessage>
          <ErrorMessage style={{ fontSize: "1rem", marginBottom: "2rem" }}>
            Please try again later or go back to the home page.
          </ErrorMessage>
          {/* <BackButton onClick={handleGoBack}>Go Back Home</BackButton> */}
        </ErrorContainer>
      </MainContent>

      <Footer
        background={getThemeByName("Footer_Background")}
        footerLinkTextColor={getThemeByName("Text_Color")}
      >
        <FooterLinks>
          <FooterLink href="#terms">
            {getContentByTitle("Terms_Conditions") || ""}
          </FooterLink>
          <FooterLink href="#policy">
            {getContentByTitle("Policy") || ""}
          </FooterLink>
        </FooterLinks>
      </Footer>
    </Container>
  );
};

export default ErrorPage;
