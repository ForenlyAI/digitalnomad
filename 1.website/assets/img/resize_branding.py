from PIL import Image, ImageOps

def create_social_media_assets():
    # Kaynak dosya yolu
    input_path = "/home/macb/follow/bahadir.ai/assets/img/channel_banner.png"
    
    try:
        img = Image.open(input_path)
    except FileNotFoundError:
        print(f"Hata: Dosya bulunamadı -> {input_path}")
        return

    # Görselin boyutları
    W, H = img.size
    
    # YouTube Banner'ında içerik tam ortadadır. 
    # YouTube Safe Area (1546x423) referans alınarak ortadaki 'dolu' kismi aliyoruz.
    # Aslinda v3 bannerda logo ve yazi cok daha kucuk (1200x350 max).
    # Biz garanti olsun diye ortadaki 1600x600'luk alani 'crop' edelim, bu bizim "Master Logo Group"umuz olur.
    
    left = (W - 1600) / 2
    top = (H - 600) / 2
    right = (W + 1600) / 2
    bottom = (H + 600) / 2
    
    # Ana içerik parçası (Logo + Yazı)
    content_img = img.crop((left, top, right, bottom))
    
    # Arka plan rengini (krem rengi) görselin sol üst köşesinden alalım
    bg_color = img.getpixel((50, 50)) 

    # Hedef Boyutlar
    targets = [
        ("twitter_header.png", 1500, 500),
        ("linkedin_banner.png", 1584, 396),
        ("facebook_cover.png", 820, 312),
        ("instagram_post.png", 1080, 1080),
        ("tiktok_profile.png", 400, 400) # Biraz yüksek tutalim
    ]

    print(f"İşleniyor: {input_path} (Boyut: {W}x{H})")
    
    for name, t_w, t_h in targets:
        # Yeni boş bir tuval oluştur (background rengi ile)
        new_img = Image.new("RGB", (t_w, t_h), bg_color)
        
        # İçeriği (content_img) bu tuvale sığacak şekilde resize et (aspect ratio koruyarak)
        # 1. Önce içeriğin hedef tuvale sığması için scale faktörünü bul
        # padding bırakmak için hedef boyutların %80'ini kullanalım
        target_content_w = t_w * 0.9
        target_content_h = t_h * 0.9
        
        ratio = min(target_content_w / content_img.width, target_content_h / content_img.height)
        new_size = (int(content_img.width * ratio), int(content_img.height * ratio))
        
        resized_content = content_img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Ortaya yerleştir
        paste_x = int((t_w - new_size[0]) / 2)
        paste_y = int((t_h - new_size[1]) / 2)
        
        new_img.paste(resized_content, (paste_x, paste_y))
        
        output_path = f"/home/macb/follow/bahadir.ai/assets/img/{name}"
        new_img.save(output_path)
        print(f"✅ Oluşturuldu: {name} ({t_w}x{t_h})")

if __name__ == "__main__":
    # Pillow kütüphanesi kontrolü
    try:
        import PIL
        create_social_media_assets()
    except ImportError:
        print("Hata: 'Pillow' kütüphanesi yüklü değil. Lütfen 'pip install Pillow' çalıştırın.")
