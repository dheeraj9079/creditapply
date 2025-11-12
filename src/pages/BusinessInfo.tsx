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
  Button,
  Footer,
  FooterLinks,
  FooterLink,
  ButtonWrapper,
  BannerImageContainer,
  BannerImage,
} from "../styles/StyledComponents";
import ErrorPage from "./ErrorPage";
import { setFormData } from "@/store/formSlice";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import clientXLogo from "../assets/clientx-logo.png";

// Simple loader (spinner)
const Loader: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
  </div>
);

const BusinessInfo: React.FC = () => {
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

  const {
    companyName,
    companyMobileNumber,
    companyMobileExt,
    companyEmailAddress,
    businessAddress,
    federalTaxClassification,
    taxNumber,
    requestedCreditAmount,
    numberOfEmployees,
    yearEstablished,
  } = formData;

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
    navigate(`/${clientName}/applicant`);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const getContentByTitle = (title: string) => {
    return content.find((item) => item.title === title)?.text || "";
  };

  const getFieldByName = (name: string) => {
    return fields.find((field) => field.name === name)?.label || name;
  };

  const getThemeByName = (title: string) => {
    const res =
      themes.find((item) => item.themeName === title)?.themeValue || "";
    return res;
  };

  // Show loader first
  if (showLoader) {
    return <Loader />;
  }

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
          <BannerImage
            src={getContentByTitle("Banner_Image")}
            alt="Banner Image"
          />
        </BannerImageContainer>

        <Title>{getContentByTitle("Business_Info_Title") || ""}</Title>
        <Description>
          {getContentByTitle("Business_Info_Sub_Title") || ""}
        </Description>

        <FormSection>
          <FormTitle>
            {getContentByTitle("Business_Info_Form_Title") || ""}
          </FormTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <InputField
                id="Company_Name"
                name="companyName"
                type="text"
                value={companyName}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Company_Name")}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Company_Mobile_Number"
                name="companyMobileNumber"
                type="tel"
                value={companyMobileNumber}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Company_Mobile_Number")}
                required
                size={3}
              />
              <InputField
                id="Company_Mobile_Ext"
                name="companyMobileExt"
                type="tel"
                value={companyMobileExt}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Company_Mobile_Ext")}
                required
                size={1}
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Company_Email_Address"
                name="companyEmailAddress"
                type="email"
                value={companyEmailAddress}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Company_Email_Address")}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Company_Business_Address"
                name="businessAddress"
                type="text"
                value={businessAddress}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Business_Address")}
                required
              />
            </FormGroup>

            <FormGroup>
              <SelectField
                id="Federal_Tax_Classification"
                name="federalTaxClassification"
                value={federalTaxClassification}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="" disabled selected hidden>
                  {getFieldByName("Federal_Tax_Classification")}
                </option>
                <option value="1">Corporation</option>
                <option value="2">Sole Proprietorship</option>
              </SelectField>
            </FormGroup>

            <FormGroup>
              <InputField
                id="Tax_Number"
                name="taxNumber"
                type="text"
                value={taxNumber}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Tax_Number")}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Requested_Credit_Amount"
                name="requestedCreditAmount"
                type="text"
                value={requestedCreditAmount}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Requested_Credit_Amount")}
                required
              />
            </FormGroup>

            <FormGroup>
              <InputField
                id="Number_Of_Employees"
                name="numberOfEmployees"
                type="text"
                size={2}
                value={numberOfEmployees}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Number_Of_Employees")}
                required
              />
              <InputField
                id="Year_Established"
                name="yearEstablished"
                type="text"
                size={2}
                value={yearEstablished}
                onChange={(e) => handleChange(e)}
                placeholder={getFieldByName("Year_Established")}
                required
              />
            </FormGroup>

            <ButtonWrapper>
              <Button
                bgColor={getThemeByName("Continue_Button_Background_Color")}
                textColor={getThemeByName("Continue_Button_Text_Color")}
                type="submit"
              >
                {getContentByTitle("Continue_Button") || "Continue"}
              </Button>
            </ButtonWrapper>
          </form>
        </FormSection>
      </MainContent>
      <Footer background={getThemeByName("Footer_Background_Color")}>
        <FooterLinks>
          <FooterLink
            footerLinkTextColor={getThemeByName(
              "Terms_And_Condition_Link_Text_Color"
            )}
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

export default BusinessInfo;
