import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import img1 from './FrontImg/3.jpg';

function Front3() {
  return (
    <Container>
          <Image src={img1}style={{height:'500px', width:'1000px', marginLeft:'100px'}} />
    </Container>
  );
}

export default Front3;
