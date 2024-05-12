import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import LikedItemTypes from '../../../utils/enums/likedItem.enum';

@Entity({ name: 'liked_items' })
class LikedItem {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  likedItemId: number;

  @Column({ type: 'enum', enum: LikedItemTypes })
  likedItemType: LikedItemTypes;

  @Column({ unique: true, type: 'uuid' })
  authorId: string;
}

export default LikedItem;
