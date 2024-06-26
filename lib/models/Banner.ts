import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
    title: String,
    headBanner: String,
    diaryTittle: String,
    diaryBanner: String,
    diaryDescription: String,
    midBanner: String,
    avatar: String,
    isActive: Boolean,
}, { toJSON: { getters: true } });

const Banner = mongoose.models.Banner || mongoose.model("Banner", BannerSchema);

export default Banner;