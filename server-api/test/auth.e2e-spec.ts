import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('test if user can register)', () => {
    const email = 'alexis@gmail.com';
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password: '1234' })
      .expect(201)
      .then((res) => {
        const { id, email: emailReturned } = res.body;
        expect(id).toBeDefined();
        expect(emailReturned).toEqual(email);
      });
  });
});
