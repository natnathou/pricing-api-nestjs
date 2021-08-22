import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
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

  afterEach(async () => {
    await app.close();
  });

  it('test if user can register with then', () => {
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

  it('test if wrong user cannot register with async await', async () => {
    const email = 'alesqqssxis@gmail.com';

    try {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password: '1234' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
