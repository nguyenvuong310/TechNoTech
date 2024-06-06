import { Injectable } from '@nestjs/common';
import { Icon } from 'src/schema/icons.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class IconsService {
  constructor(@InjectModel(Icon.name) private iconModel: Model<Icon>) {}
  async findAll(): Promise<Icon[]> {
    return this.iconModel.find().exec();
  }
  async create(icon: Icon): Promise<Icon> {
    const newIcon = new this.iconModel(icon);
    return newIcon.save();
  }
}
