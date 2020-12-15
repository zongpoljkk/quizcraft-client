const OAuthRedirectPage = () => {
  const redirect_uri = 'http://localhost:3000/oauth/mcv-callback'
  const URL = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${config.client_id}&redirect_uri=${redirect_uri}`;

  return (
    <Container>
    
    </Container>
  );
};



export default OAuthRedirectPage;