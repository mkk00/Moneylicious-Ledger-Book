import { PiMusicNotes, PiPiggyBankFill } from 'react-icons/pi'
import { IoSchoolOutline, IoEllipsisHorizontal } from 'react-icons/io5'
import { LiaSubwaySolid, LiaMoneyBillAlt } from 'react-icons/lia'
import { FiSmartphone } from 'react-icons/fi'
import {
  PiBank,
  PiHandCoins,
  PiHandHeart,
  PiWallet,
  PiStackOverflowLogo,
  PiBuildings
} from 'react-icons/pi'
import { GiHealthPotion } from 'react-icons/gi'
import { HiOutlineReceiptTax } from 'react-icons/hi'
import { BsHouseHeart, BsCalculatorFill, BsCalendarMinus } from 'react-icons/bs'
import {
  TbHealthRecognition,
  TbDeviceGamepad2,
  TbShirtSport
} from 'react-icons/tb'
import {
  MdOutlineShoppingBag,
  MdSubscriptions,
  MdOutlineLocalHospital,
  MdFastfood
} from 'react-icons/md'
import { LuBaby, LuDog, LuCoffee } from 'react-icons/lu'

export const CATEGORY_LIST = [
  {
    id: 0,
    category: '식비',
    icon: <MdFastfood size={28} />
  },
  {
    id: 1,
    category: '카페',
    icon: <LuCoffee size={28} />
  },
  {
    id: 2,
    category: '교통비',
    icon: <LiaSubwaySolid size={28} />
  },
  {
    id: 3,
    category: '통신비',
    icon: <FiSmartphone size={28} />
  },
  {
    id: 4,
    category: '의류',
    icon: <TbShirtSport size={28} />
  },
  {
    id: 5,
    category: '생필품',
    icon: <BsCalculatorFill size={28} />
  },
  {
    id: 6,
    category: '공과금',
    icon: <LiaMoneyBillAlt size={28} />
  },
  {
    id: 7,
    category: '세금',
    icon: <HiOutlineReceiptTax size={28} />
  },
  {
    id: 8,
    category: '보험',
    icon: <BsHouseHeart size={28} />
  },
  {
    id: 9,
    category: '문화생활',
    icon: <PiMusicNotes size={28} />
  },
  {
    id: 10,
    category: '의료',
    icon: <MdOutlineLocalHospital size={28} />
  },
  {
    id: 11,
    category: '건강',
    icon: <TbHealthRecognition size={28} />
  },
  {
    id: 12,
    category: '교육',
    icon: <IoSchoolOutline size={28} />
  },
  {
    id: 13,
    category: '저축',
    icon: <PiPiggyBankFill size={28} />
  },
  {
    id: 14,
    category: '쇼핑',
    icon: <MdOutlineShoppingBag size={28} />
  },
  {
    id: 15,
    category: '구독',
    icon: <MdSubscriptions size={28} />
  },
  {
    id: 16,
    category: '육아',
    icon: <LuBaby size={28} />
  },
  {
    id: 17,
    category: '취미',
    icon: <TbDeviceGamepad2 size={28} />
  },
  {
    id: 18,
    category: '반려',
    icon: <LuDog size={28} />
  },
  {
    id: 19,
    category: '경조사',
    icon: <BsCalendarMinus size={28} />
  },
  {
    id: 20,
    category: '기타',
    icon: <IoEllipsisHorizontal size={28} />
  }
]

export const INCOME_LIST = [
  {
    id: 0,
    category: '월급',
    icon: <PiHandHeart size={28} />
  },
  {
    id: 1,
    category: '용돈',
    icon: <PiWallet size={28} />
  },
  {
    id: 2,
    category: '부수입',
    icon: <PiHandCoins size={28} />
  },
  {
    id: 3,
    category: '상여금',
    icon: <GiHealthPotion size={28} />
  },
  {
    id: 4,
    category: '금융',
    icon: <PiBank size={28} />
  },
  {
    id: 5,
    category: '보험',
    icon: <PiBuildings size={28} />
  },
  {
    id: 6,
    category: '포인트',
    icon: <PiStackOverflowLogo size={28} />
  },
  {
    id: 7,
    category: '기타',
    icon: <IoEllipsisHorizontal size={28} />
  }
]
