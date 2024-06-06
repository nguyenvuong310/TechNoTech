import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Color } from 'src/schema/colors.schema';
import { Model } from 'mongoose';
@Injectable()
export class ColorsService {
  constructor(@InjectModel(Color.name) private colorModel: Model<Color>) {}
  async findAll(): Promise<Color[]> {
    return this.colorModel.find().exec();
  }
  async create(color: Color): Promise<Color> {
    const newColor = new this.colorModel(color);
    return newColor.save();
  }
  async getColorById(id: string): Promise<Color> {
    return this.colorModel.findById(id);
  }
}
