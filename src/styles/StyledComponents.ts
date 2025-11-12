import styled from "styled-components";
import { lighten, darken } from "polished";

interface ButtonProps {
  bgColor: string;
  textColor?: string;
}

interface FooterProps {
  background?: string;
  footerLinkTextColor?: string;
}

interface HeaderProps {
  background?: string;
}

// Theme colors
export const theme = {
  colors: {
    primary: "#2c5282",
    primaryDark: "#2a4e7c",
    accent: "#ed8936",
    white: "#ffffff",
    lightGray: "#f7fafc",
    gray: "#718096",
    black: "#1a202c",
  },
  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
  },
};

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.lightGray};
`;

export const Header = styled.header<HeaderProps>`
  background: ${({ background }) => `
    linear-gradient(135deg, ${background || theme.colors.primary} 0%, ${background || theme.colors.primaryDark
    } 100%)
  `};
  padding: 2rem 1rem;
  text-align: left;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem 1rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const LogoImage = styled.img`
  height: 3rem;
  width: auto;
  object-fit: contain;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 2.5rem;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 3rem 1rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.black};
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const Description = styled.p`
  color: ${theme.colors.gray};
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 2rem;
  }
`;

export const FormSection = styled.section`
  padding: 2rem;
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

export const FormTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
`;

export const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${theme.colors.black};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  flex: ${props => props.size || 1};
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  margin-right: 0.25rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.gray};
  }
`;

export const Select = styled.select`
  width: 100%;
  flex: ${(props) => props.size || 1};
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  margin-right: 0.25rem;
  appearance: none; /* Remove default arrow */
  background-color: white;

  /* Custom gray arrow */
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px 12px;
  color: ${theme.colors.gray};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &:valid {
      color: #000;
    }
`;


export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const Button = styled.button<ButtonProps>`
  padding: 0.875rem 1.5rem;
  background: ${({ bgColor }) => bgColor || theme.colors.primary};
  color: ${({ textColor }) => textColor || theme.colors.white};
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  width: 200px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  // &:hover {
  //   background: ${theme.colors.primaryDark};
  // }
  &:hover {
    background: ${({ bgColor }) => {
    const base = bgColor || "#3a5b75";
    return `linear-gradient(135deg, ${lighten(0.1, base)} 0%, ${darken(
      0.1,
      base
    )} 100%)`;
  }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Footer = styled.footer<FooterProps>`
  background: ${({ background }) => `
    linear-gradient(135deg, ${background || theme.colors.primary} 0%, ${background || theme.colors.primaryDark
    } 100%)
  `};
  padding: 1.5rem;
  text-align: center;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 1rem;
  }
`;

export const FooterLink = styled.a<FooterProps>`
  color: ${({ footerLinkTextColor }) =>
    footerLinkTextColor || theme.colors.white};
  text-decoration: underline;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const CreditCardContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const CreditCardImage = styled.img``

export const CardLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 2rem;
`;

export const CardLogoImage = styled.img`
  height: 1.5rem;
  width: auto;
  object-fit: contain;
`;

export const CardNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.2rem;
  margin-bottom: 1.5rem;
  font-family: "Courier New", monospace;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const CardValid = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const CardHolder = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const SuccessMessage = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const SuccessTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.black};
  margin-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const SuccessDescription = styled.h4`
  color: ${theme.colors.black};
  margin-bottom: 1rem;
  font-weight: bold;
`;

export const MailMessage = styled.p`
  color: ${theme.colors.black};
  margin-bottom: 2rem;
  font-size: 0.875rem;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

export const ErrorTitle = styled.h1<{ color?: string }>`
  font-size: 4rem;
  font-weight: bold;
  color: ${({ color }) => color || theme.colors.primary};
  margin-bottom: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 4rem;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.gray};
  margin-bottom: 2rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

export const BackButton = styled(Button)`
  max-width: 200px;
  margin: 0 auto;
`;

export const BannerImageContainer = styled.div`
  margin-bottom: 2rem;
`

export const BannerImage = styled.img`

`
