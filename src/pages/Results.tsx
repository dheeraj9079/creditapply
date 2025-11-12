import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import {
  Container,
  Header,
  Logo,
  LogoImage,
  MainContent,
  Footer,
  FooterLinks,
  FooterLink,
  SuccessMessage,
  SuccessTitle,
  SuccessDescription,
  MailMessage,
  BannerImageContainer,
  BannerImage,
  CreditCardContainer,
  CreditCardImage,
} from "../styles/StyledComponents";

const Results: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { content } = useSelector((state: RootState) => state.content);
  const { themes } = useSelector((state: RootState) => state.theme);
  const { companyName, isSubmitted } = useSelector(
    (state: RootState) => state.form
  );

  useEffect(() => {
    if (!isSubmitted) {
      navigate("/");
      return;
    }
    // dispatch(fetchContent());
  }, [dispatch, isSubmitted, navigate]);

  const getContentByTitle = (title: string) => {
    return content.find((item) => item.title === title)?.text || "";
  };

  const getThemeByName = (title: string) => {
    const res =
      themes.find((item) => item.themeName === title)?.themeValue || "";
    console.log("Theme for", title, "is", res);
    return res;
  };

  return (
    <Container>
      <Header background={getThemeByName("Header_Background_Color")}>
        <Logo>
          <LogoImage src={getContentByTitle("Header_Logo")} alt="Header Logo" />
        </Logo>
      </Header>
      <MainContent>
        <BannerImageContainer>
          <BannerImage src={getContentByTitle("Banner_Image")} alt="Banner Image" />
        </BannerImageContainer>
        <SuccessMessage>
          <SuccessTitle>
            {getContentByTitle("Results_Title")?.replace(
              "[name]",
              companyName
            ) || ``}
          </SuccessTitle>
          <SuccessDescription>
            {getContentByTitle("Results_Sub_Heading1") || ""}
          </SuccessDescription>
          <MailMessage>
            {getContentByTitle("Results_Sub_Heading2") || ""}
          </MailMessage>
          <MailMessage>
            {getContentByTitle("Results_Sub_Heading3") || ""}
          </MailMessage>
        </SuccessMessage>

        <CreditCardContainer>
          <CreditCardImage
            src={getContentByTitle("Approved_Credit_Card_Image")}
            alt="Approved Credit Card Image"
            width="400px"
            height="250px"

          />
        </CreditCardContainer>
      </MainContent>
      <Footer background={getThemeByName("Footer_Background_Color")}>
        <FooterLinks>
          <FooterLink
            footerLinkTextColor={getThemeByName("Terms_And_Condition_Link_Text_Color")}
            href="#terms"
          >
            {getContentByTitle("Terms_And_Condition_Link_Text") || ""}
          </FooterLink>
          <FooterLink
            footerLinkTextColor={getThemeByName("Policy_Link_Text_Color")}
            href="#policy"
          >
            {getContentByTitle("Policy_Link_Text") || ""}
          </FooterLink>
        </FooterLinks>
      </Footer>
    </Container>
  );
};

export default Results;
