import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { User } from '@src/entity/User';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { verify } from 'argon2';
import jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  private userRepository = getRepository(User);
  private secret = String(process.env.JWT_SECRET);

  @Post('authenticate')
  private async authenticate(
    req: Request,
    res: Response
  ): Promise<Response<Record<string, unknown>>> {
    const { email, password } = req.body;

    const user = await this.userRepository.findOne({ email: email });

    if (!user) {
      return res.sendStatus(401);
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      return res.sendStatus(401);
    }

    const token = jwt.sign({ id: user.id }, this.secret, { expiresIn: '1d' });

    const userId = user.id;

    return res.json({
      userId,
      token,
    });
  }
}
