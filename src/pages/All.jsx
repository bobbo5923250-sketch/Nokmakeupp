import React from 'react';
import GalleryPage from './GalleryPage';

const modules = import.meta.glob('../img/all/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });

const All = () => (
  <GalleryPage
    modules={modules}
    eyebrow="Complete portfolio"
    title="All"
    accent="Works"
    copy="สำรวจผลงานทั้งหมดเพื่อดูภาพรวมสไตล์ของ Nokmakeupp ตั้งแต่งานผิวละมุนไปจนถึงลุคที่ชัดขึ้นสำหรับวันสำคัญ"
  />
);

export default All;
