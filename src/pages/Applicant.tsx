import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import { fetchContent } from "../store/contentSlice";
import { fetchFields } from "../store/fieldSlice";
import { fetchThemes } from "../store/themeSlice";
import {
  Container,
  Header,
  Logo,
  LogoImage,
  MainContent,
  Title,
  Description,
  FormSection,
  FormTitle,
  FormGroup,
  Input,
  Button,
  Footer,
  FooterLinks,
  FooterLink,
  ButtonWrapper,
  BannerImageContainer,
  BannerImage
} from "../styles/StyledComponents";
import clientXLogo from "../assets/clientx-logo.png";
import ErrorPage from "./ErrorPage";
import { setFormData, submitForm } from "@/store/formSlice";
import { sub } from "date-fns";
import InputField from "@/components/ui/InputField";

const Applicant: React.FC = () => {
  const { error: contentError, loading: contentLoading } = useSelector(
    (state: RootState) => state.content
  );
  const { error: fieldError, loading: fieldLoading } = useSelector(
    (state: RootState) => state.field
  );
  const { error: themeError, loading: themeLoading } = useSelector(
    (state: RootState) => state.theme
  );

  const { clientName = "" } = useParams<{ clientName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(true);

  const { content } = useSelector((state: RootState) => state.content);
  const { fields } = useSelector((state: RootState) => state.field);
  const { themes } = useSelector((state: RootState) => state.theme);
  const formData = useSelector((state: RootState) => state.form);
  const { applicantFirstName, applicantLastName, applicantEmailAddress, applicantAddress, applicantMobileNumber, applicantMobileExt, applicantJobTitle, applicantDateOfBirth } = formData;

  // Combined loading
  const isLoading = contentLoading || fieldLoading || themeLoading;

  useEffect(() => {
    dispatch(fetchContent(clientName));
    dispatch(fetchFields(clientName));
    dispatch(fetchThemes(clientName));
  }, [dispatch, clientName]);

  useEffect(() => {
    if (!isLoading) {
      // wait extra 3 seconds after API completes
      const timer = setTimeout(() => setShowLoader(false), 3000);
      return () => clearTimeout(timer);
    } else {
      // show loader while API is fetching
      setShowLoader(true);
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());
    navigate(`/${clientName}/results`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  }

  const getContentByTitle = (title: string) => {
    return content.find((item) => item.title === title)?.text || "";
  };

  const getFieldByName = (name: string) => {
    return fields.find((field) => field.name === name)?.label || name;
  };

  const getThemeByName = (title: string) => {
    const res =
      themes.find((item) => item.themeName === title)?.themeValue || "";
    console.log("Theme for", title, "is", res);
    return res;
  };

  // Show error page if any API fails
  if (contentError || fieldError || themeError) {
    return <ErrorPage />;
  }

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
        <Title>{getContentByTitle("Applicant_Info_Title") || ""}</Title>
        <Description>
          {getContentByTitle("Applicant_Info_Sub_Title") || ""}
        </Description>

        <FormSection>
          <FormTitle>
            {getContentByTitle("Applicant_Form_Title") || ""}
          </FormTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <InputField
                id="Applicant_First_Name"
                name="applicantFirstName"
                type="text"
                value={applicantFirstName}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Applicant_First_Name")}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Applicant_Last_Name"
                name="applicantLastName"
                type="text"
                value={applicantLastName}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Applicant_Last_Name")}
                required
                size={3}
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Applicant_Email_Address"
                name="applicantEmailAddress"
                type="email"
                value={applicantEmailAddress}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Applicant_Email_Address")}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Applicant_Address"
                name="applicantAddress"
                type="text"
                value={applicantAddress}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Applicant_Address")}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputField
                type="tel"
                id="Applicant_Mobile_Number"
                name="applicantMobileNumber"
                value={applicantMobileNumber}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Applicant_Mobile_Number")}
                required
                size={3}
              />
              <InputField
                id="Applicant_Mobile_Ext"
                name="applicantMobileExt"
                type="text"
                value={applicantMobileExt}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Applicant_Mobile_Ext")}
                required
                size={1}
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Applicant_Job_Title"
                name="applicantJobTitle"
                type="text"
                value={applicantJobTitle}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Applicant_Job_Title")}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Applicant_Date_Of_Birth"
                name="applicantDateOfBirth"
                type="text"
                value={applicantDateOfBirth}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Applicant_Date_Of_Birth")}
                required
              />
            </FormGroup>

            <ButtonWrapper>
              <Button
                bgColor={getThemeByName("Submit_Button_Background_Color")}
                textColor={getThemeByName("Submit_Button_Text_Color")}
                type="submit"
              >
                {getContentByTitle("Submit_Button_Text") || "Submit"}
              </Button>
              <Button
                bgColor={getThemeByName("Back_Button_Background_Color")}
                textColor={getThemeByName("Back_Button_Text_Color")}
                type="button"
                onClick={() => navigate(`/${clientName}/business-info`)}
              >
                {getContentByTitle("Back_Button_Text") || "Back"}
              </Button>
            </ButtonWrapper>
          </form>
        </FormSection>
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

export default Applicant;
