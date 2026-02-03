import AuthenticationForm from "@/components/AuthenticationForm";
import {
  Container,
  Card,
  CardBody,
  Stack,
  Divider,
  Heading,
  Box,
} from "@chakra-ui/react";

export default function Authenticate() {
  return (
    <Container maxW="container.xl" py={40}>
      <Card>
        <CardBody>
          <Stack direction={{ base: "column", md: "row" }} spacing={20} justify="center">
            <Box>
              <Heading textAlign={"center"} py={4} fontSize={30}>Creaza un cont!</Heading>
            <AuthenticationForm isSignup={true} />
            </Box>
            <Divider borderColor="gray.500" display={{base:"block" , md: "none"}}/>
            <Divider borderColor="gray.500" display={{base:"none" , md: "block"}} orientation="vertical"/>
            <Box>
              <Heading textAlign={"center"} py={4} fontSize={30}>Logheaza-te!</Heading>
            <AuthenticationForm isSignup={false} />
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Container>
  );
}
