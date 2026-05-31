import React from 'react';
import GalleryPage from './GalleryPage';

const modules = import.meta.glob('../img/daily/*.{jpg,jpeg,png,JPG,JPEG,PNG}', { eager: true });

const Daily = () => (
  <GalleryPage
    modules={modules}
    eyebrow="Event portfolio"
    title="Daily"
    accent="Makeup"
    copy="รวมลุคแต่งหน้าออกงาน รับปริญญา พรีเวดดิ้ง และโอกาสพิเศษที่ต้องการความสวยชัด แต่ยังดูเป็นธรรมชาติในชีวิตจริง"
  />
);

export default Daily;
