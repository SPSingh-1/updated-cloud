import Carousel from 'react-bootstrap/Carousel';
import Front1 from './Front1';
import Front2 from './Front2';
import Front3 from './Front3';

function Front() {
  return (
    <div style={{backgroundColor:"red"}}>
    <h1 className='d-flex flex-column align-items-center'>Some Features about the My-Cloud</h1>
    <Carousel className='bg-dark justify-items-center'style={{ height: '500px' }}>
      <Carousel.Item>
        <Front1 text="First slide bg-dark" />
        <Carousel.Caption className='text-light'>
          <h1>First Feature</h1>
          <h3>You can access your notes any where at the medium of internet.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Front2 text="Second slide" />
        <Carousel.Caption className='text-light '>
          <h1>Second Feature</h1>
          <h3>This website provide the more security. It provide you to Login Id Password.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Front3 text="Third slide" />
        <Carousel.Caption className='text-light'>
          <h1>Third Feature</h1>
          <h3>
            You can easily manages your notes Add, Delete and Update.
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Front;