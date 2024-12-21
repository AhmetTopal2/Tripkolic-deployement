# TripKolic Proje Dokümantasyonu

## Proje Genel Bakış
Bu proje, turlar, biletler, kiralama ve transfer hizmetleri için mobil öncelikli bir rezervasyon platformudur. Next.js, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## Temel Bileşenler

### 1. Navbar (`src/components/Navbar.tsx`)
- Ana navigasyon bileşeni
- Giriş/kayıt butonu ve hamburger menü içerir
- Logo görüntüleme
- Kategori ve filtre menüsünü kontrol eder

### 2. FilterMenu (`src/components/FilterMenu.tsx`)
- Kategori seçimi için menü
- Filtre popup'ını tetikler
- Kategoriler: Turlar, Biletler, Kiralama, Transfer

### 3. FilterPopup (`src/components/FilterPopup.tsx`)
- Gelişmiş filtreleme arayüzü
- Lokasyon arama
- Fiyat aralığı seçimi
- Başlangıç zamanı filtresi
- Grup büyüklüğü filtresi
- Araç tipi ve özellik seçimi

### 4. ProductGrid (`src/components/ProductGrid.tsx`)
- Ürünleri grid yapısında gösterir
- API'den veri çeker
- Filtreleme mantığını uygular:
  - Lokasyon bazlı filtreleme
  - Fiyat bazlı filtreleme
  - Zaman bazlı filtreleme
  - Grup büyüklüğü filtreleme
  - Araç tipi filtreleme
- Yükleme ve hata durumlarını yönetir

### 5. ProductCard (`src/components/ProductCard.tsx`)
- Tek bir ürünü görüntüler
- Resim galerisi
- Ürün detayları:
  - Başlık ve kategori
  - Fiyat bilgisi
  - Süre ve grup büyüklüğü
  - Ulaşım aracı
  - Rehber dilleri
- Lokasyon bilgileri:
  - Başlangıç noktası
  - Durak noktaları
  - Durak süreleri
  - Her duraktaki aktiviteler
- Dahil olan hizmetler
- Başlangıç saatleri
- Rezervasyon butonu

### 6. ImageCarousel (`src/components/ImageCarousel.tsx`)
- Ürün resimlerini slider olarak gösterir
- Gezinme kontrolleri
- Otomatik boyutlandırma

### 7. Login (`src/components/Login.tsx`)
- Giriş/Kayıt formu
- Form doğrulama
- Test kullanıcı girişi

## Veri Yapıları

### Route (Rota) Yapısı
```typescript
interface Route {
  id: number;
  name: string;
  startTime: string[];
  groupSize: number;
  duration: string;
  guideLanguage: string[];
  locations?: Array<{
    id: number;
    lat: number;
    lng: number;
    name: string;
    stop: number | null;
    activities: Array<{ name: string }>;
    sightseeing: boolean;
  }>;
}
```

### Filtre Değerleri
```typescript
interface FilterValues {
  location?: string;
  priceRange: [number, number];
  startTime: [string, string];
  groupSize: [number, number];
  vehicle?: string[];
  features?: string[];
  theme?: string[];
  activities?: string[];
}
```

## Yeni Özellikler ve Güncellemeler

### 1. Lokasyon Bazlı Arama
- Lokasyon arama alanı eklendi
- Hem ana lokasyon hem de durak noktalarında arama yapabilme
- Case-insensitive arama desteği

### 2. Gelişmiş Rota Görüntüleme
- Başlangıç noktası gösterimi
- Durak noktaları listesi
- Her durak için:
  - Durak süresi
  - Aktivite listesi
  - Görsel işaretleyiciler

### 3. Filtreleme İyileştirmeleri
- Lokasyon bazlı filtreleme eklendi
- Filtre mantığı optimize edildi
- Daha iyi hata yönetimi

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleme:
```bash
npm install
```

2. Geliştirme sunucusunu başlatma:
```bash
npm run dev
```

3. Tarayıcıda açma:
```
http://localhost:3000
```

## Önemli Notlar

- Mobil öncelikli tasarım
- Responsive yapı
- TypeScript tip güvenliği
- Tailwind ile stil yönetimi
- Next.js görüntü optimizasyonu
- API veri önbelleği
- Lokasyon bazlı arama ve filtreleme
- Detaylı rota görüntüleme

## Gelecek Geliştirmeler

1. Harita entegrasyonu
2. Gelişmiş lokasyon filtreleme
3. Rota optimizasyonu
4. Çoklu dil desteği
5. Performans iyileştirmeleri
6. Offline kullanım desteği
