import { Heading, Hr, Text } from "@react-email/components";

interface Props {
	invoiceID: string;
	items: Item[];
	amount: number;
	issuerName: string;
	accountNumber: string;
	currency: string;
}
export default function EmailTemplate({
	invoiceID,
	items,
	amount,
	issuerName,
	accountNumber,
	currency,
}: Props) {
	return (
		<div>
			<Heading as='h2' style={{ color: "#0ea5e9" }}>
				Purhcase Invoice from {issuerName}
			</Heading>
			<Text style={{ marginBottom: 5 }}>Invoice No: INV0{invoiceID}</Text>
			<Heading as='h3'> Payment Details:</Heading>
			<Text>Account Details: {issuerName}</Text>
			<Text>Account Number: {accountNumber}</Text>
			<Text>Total Amount: {`${currency}${amount}`}</Text>
			<Hr />
			<Heading as='h3'> Items: </Heading>
			{items &&
				items.map((item, index) => (
					<div key={index}>
						<Text>
							{item.cost} x {item.quantity} = {item.price}
						</Text>
					</div>
				))}
		</div>
	);
}

/*
import { Html, Head, Preview, Body, Container, Heading, Text, Link } from '@react-email/components';

const EmailTemplate = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Our Service</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome!</Heading>
          <Text style={text}>Thanks for signing up for our service.</Text>
          <Link href="https://example.com" style={link}>
            Visit our website
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const text = {
  fontSize: '16px',
  lineHeight: '1.5',
};

const link = {
  color: '#1a73e8',
  textDecoration: 'underline',
};
*/