import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from "@react-email/components";

export function ResetPasswordEmailTemplate({ companyName, resetLink }) {
  return (
    <Html>
      <Head />

      <Body>
        <Container>
          <Heading>Hello {companyName}</Heading>

          <Text>You requested a password reset.</Text>

          <Button href={resetLink}>Reset Password</Button>

          <Text>This link expires in 15 minutes.</Text>
        </Container>
      </Body>
    </Html>
  );
}
