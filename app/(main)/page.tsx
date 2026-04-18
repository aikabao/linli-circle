'use client';
import Hero from '@/components/Hero';
import DataChapter from '@/components/DataChapter';
import RoleCards from '@/components/RoleCards';
import CoinCycle from '@/components/CoinCycle';
import ActivityWall from '@/components/ActivityWall';
import FooterCTA from '@/components/FooterCTA';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <section id="首卷"><Hero /></section>
      <section id="智联"><DataChapter /></section>
      <section id="自治"><RoleCards /></section>
      <section id="烟火"><CoinCycle /></section>
      <section id="格物"><ActivityWall /></section>
      <section id="入圈"><FooterCTA /></section>
    </main>
  );
}