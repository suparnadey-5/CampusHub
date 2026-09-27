import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types/user.types';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  branch?: string;
  year?: number;
  section: string;
  age: number;
  phone: string;
  rollNumber: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUser> { }

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'organizer', 'admin'],
      default: 'student',
      required: true,
    },
    branch: {
      type: String,
      trim: true,
      maxlength: [50, 'Branch cannot exceed 50 characters'],
    },
    year: {
      type: Number,
      min: [1, 'Year must be at least 1'],
      max: [8, 'Year cannot exceed 8'],
    },
    age: {
      type: Number,
      required: true,
      min: [16, "Minimum age is 16"],
      max: [60, "Maximum age is 60"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please provide a valid 10-digit phone number"],
    },

    section: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      maxlength: [5, "Section cannot exceed 5 characters"],
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function save(this: IUser) {
  // If password not modified, skip hashing
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
