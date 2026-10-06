import { SocialMediaDesign, StoreSettings } from '../../types';

export function exportSocialDesignAsImage(design: SocialMediaDesign, settings: StoreSettings): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Determine canvas dimensions based on format
      let width = 1080;
      let height = 1080;

      switch (design.format) {
        case 'ig_portrait':
          width = 1080;
          height = 1350;
          break;
        case 'ig_story':
        case 'reel_cover':
        case 'fb_story':
          width = 1080;
          height = 1920;
          break;
        case 'fb_post':
          width = 1200;
          height = 1500;
          break;
        case 'ig_post':
        default:
          width = 1080;
          height = 1080;
          break;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // Background theme styling
      let bgColor = '#121110';
      let accentGold = '#C8A265';
      let textColor = '#FFFFFF';
      let secondaryText = '#D1C7B7';
      let cardBg = 'rgba(28, 25, 23, 0.85)';

      if (design.theme === 'royal_gold') {
        bgColor = '#1F1710';
        accentGold = '#D4AF37';
        textColor = '#FAF6EE';
        secondaryText = '#E0D2BE';
        cardBg = 'rgba(38, 28, 20, 0.9)';
      } else if (design.theme === 'warm_walnut') {
        bgColor = '#261C14';
        accentGold = '#DEB887';
        textColor = '#FDFBF7';
        secondaryText = '#C7B299';
        cardBg = 'rgba(46, 34, 25, 0.9)';
      } else if (design.theme === 'ivory_chic') {
        bgColor = '#F5F2EC';
        accentGold = '#9E7E45';
        textColor = '#1E1B18';
        secondaryText = '#5C5449';
        cardBg = 'rgba(255, 255, 255, 0.95)';
      } else if (design.theme === 'emerald_night') {
        bgColor = '#0D1C17';
        accentGold = '#E5C07B';
        textColor = '#F4FAF7';
        secondaryText = '#A8C3B8';
        cardBg = 'rgba(18, 38, 32, 0.9)';
      } else if (design.theme === 'pure_minimal') {
        bgColor = '#FFFFFF';
        accentGold = '#222222';
        textColor = '#111111';
        secondaryText = '#666666';
        cardBg = 'rgba(248, 248, 248, 0.95)';
      }

      // 1. Draw Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Subtle radial gradient light for luxury atmosphere
      const radial = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.7);
      radial.addColorStop(0, design.theme === 'ivory_chic' || design.theme === 'pure_minimal' ? 'rgba(0,0,0,0.02)' : 'rgba(200, 162, 101, 0.12)');
      radial.addColorStop(1, 'transparent');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // 2. Luxury Outer Frame Borders
      ctx.strokeStyle = accentGold;
      ctx.lineWidth = 3;
      const margin = 40;
      ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

      // Corner ornaments
      const cornerSize = 30;
      ctx.lineWidth = 5;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(margin, margin + cornerSize);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + cornerSize, margin);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(width - margin - cornerSize, margin);
      ctx.lineTo(width - margin, margin);
      ctx.lineTo(width - margin, margin + cornerSize);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(margin, height - margin - cornerSize);
      ctx.lineTo(margin, height - margin);
      ctx.lineTo(margin + cornerSize, height - margin);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(width - margin - cornerSize, height - margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.lineTo(width - margin, height - margin - cornerSize);
      ctx.stroke();

      // 3. Header: Brand Logo & Title
      if (design.showLogo) {
        ctx.textAlign = 'center';
        ctx.fillStyle = accentGold;
        ctx.font = 'bold 32px Cairo, Tajawal, sans-serif';
        ctx.fillText('❖  بصمة عالم الفخامة  ❖', width / 2, margin + 55);

        ctx.fillStyle = secondaryText;
        ctx.font = '18px Cairo, Tajawal, sans-serif';
        ctx.fillText('أثاث يترك بصمته في كل مساحة', width / 2, margin + 85);
      }

      // Load Product Image
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        // Image Container Box calculation
        let imgTop = margin + (design.showLogo ? 110 : 40);
        let imgHeight = height * 0.48;
        if (design.format === 'ig_story' || design.format === 'fb_story' || design.format === 'reel_cover') {
          imgHeight = height * 0.52;
        } else if (design.format === 'ig_portrait' || design.format === 'fb_post') {
          imgHeight = height * 0.46;
        }

        const imgWidth = width - margin * 2 - 40;
        const imgLeft = margin + 20;

        // Clip rounded rectangle for image
        ctx.save();
        const r = 16;
        ctx.beginPath();
        ctx.moveTo(imgLeft + r, imgTop);
        ctx.lineTo(imgLeft + imgWidth - r, imgTop);
        ctx.quadraticCurveTo(imgLeft + imgWidth, imgTop, imgLeft + imgWidth, imgTop + r);
        ctx.lineTo(imgLeft + imgWidth, imgTop + imgHeight - r);
        ctx.quadraticCurveTo(imgLeft + imgWidth, imgTop + imgHeight, imgLeft + imgWidth - r, imgTop + imgHeight);
        ctx.lineTo(imgLeft + r, imgTop + imgHeight);
        ctx.quadraticCurveTo(imgLeft, imgTop + imgHeight, imgLeft, imgTop + imgHeight - r);
        ctx.lineTo(imgLeft, imgTop + r);
        ctx.quadraticCurveTo(imgLeft, imgTop, imgLeft + r, imgTop);
        ctx.closePath();
        ctx.clip();

        // Draw image with scale & offset
        const scale = design.imageScale || 1;
        const offsetX = (design.imageOffsetX || 0) * 2;
        const offsetY = (design.imageOffsetY || 0) * 2;

        const srcAspect = img.width / img.height;
        const destAspect = imgWidth / imgHeight;

        let drawW = imgWidth * scale;
        let drawH = imgHeight * scale;

        if (srcAspect > destAspect) {
          drawW = imgHeight * srcAspect * scale;
        } else {
          drawH = (imgWidth / srcAspect) * scale;
        }

        const drawX = imgLeft + (imgWidth - drawW) / 2 + offsetX;
        const drawY = imgTop + (imgHeight - drawH) / 2 + offsetY;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        ctx.restore();

        // Image frame border
        ctx.strokeStyle = accentGold;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(imgLeft, imgTop, imgWidth, imgHeight);

        // Badge if present
        if (design.badgeText) {
          const badgeText = design.badgeText;
          ctx.font = 'bold 22px Cairo, Tajawal, sans-serif';
          const textWidth = ctx.measureText(badgeText).width;
          const badgeW = textWidth + 40;
          const badgeH = 44;
          const badgeX = width - margin - 30 - badgeW;
          const badgeY = imgTop + 20;

          ctx.fillStyle = accentGold;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 8) : ctx.rect(badgeX, badgeY, badgeW, badgeH);
          ctx.fill();

          ctx.fillStyle = '#121110';
          ctx.textAlign = 'center';
          ctx.fillText(badgeText, badgeX + badgeW / 2, badgeY + 29);
        }

        // 4. Content Area below Image
        const contentTop = imgTop + imgHeight + 35;
        ctx.textAlign = 'right';

        // Headline
        ctx.fillStyle = textColor;
        ctx.font = 'bold 36px Cairo, Tajawal, sans-serif';
        const headline = design.customHeadline || design.productName;
        ctx.fillText(headline, width - margin - 30, contentTop);

        // Subhead
        ctx.fillStyle = secondaryText;
        ctx.font = '22px Cairo, Tajawal, sans-serif';
        const subhead = design.customSubhead || '';
        ctx.fillText(subhead, width - margin - 30, contentTop + 40);

        // 5. Price & Pricing Card
        const priceTop = contentTop + 85;
        if (design.showPrice && design.temporaryPrice) {
          const priceStr = new Intl.NumberFormat('ar-SA').format(design.temporaryPrice) + ' ' + settings.currency;

          // Price Tag Box
          const boxW = 340;
          const boxH = 70;
          const boxX = width - margin - 30 - boxW;
          const boxY = priceTop - 10;

          ctx.fillStyle = cardBg;
          ctx.beginPath();
          ctx.roundRect ? ctx.roundRect(boxX, boxY, boxW, boxH, 10) : ctx.rect(boxX, boxY, boxW, boxH);
          ctx.fill();

          ctx.strokeStyle = accentGold;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Current Price
          ctx.textAlign = 'right';
          ctx.fillStyle = accentGold;
          ctx.font = 'bold 34px Cairo, Tajawal, sans-serif';
          ctx.fillText(priceStr, boxX + boxW - 20, boxY + 46);

          // Old Price if enabled
          if (design.showOldPrice && design.temporaryOriginalPrice && design.temporaryOriginalPrice > design.temporaryPrice) {
            const oldPriceStr = new Intl.NumberFormat('ar-SA').format(design.temporaryOriginalPrice) + ' ' + settings.currency;
            ctx.textAlign = 'left';
            ctx.fillStyle = secondaryText;
            ctx.font = '20px Cairo, Tajawal, sans-serif';
            ctx.fillText(oldPriceStr, boxX + 20, boxY + 44);

            // Strikethrough line
            const oldWidth = ctx.measureText(oldPriceStr).width;
            ctx.strokeStyle = '#E05A47';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(boxX + 16, boxY + 38);
            ctx.lineTo(boxX + 24 + oldWidth, boxY + 38);
            ctx.stroke();
          }
        }

        // 6. Footer Contact & Handles
        if (design.showContact) {
          const footerY = height - margin - 35;
          ctx.textAlign = 'center';

          // Decorative divider
          ctx.strokeStyle = accentGold;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(margin + 50, footerY - 45);
          ctx.lineTo(width - margin - 50, footerY - 45);
          ctx.stroke();

          ctx.fillStyle = textColor;
          ctx.font = '20px Cairo, Tajawal, sans-serif';

          const contacts: string[] = [];
          if (design.showWhatsapp) contacts.push(`واتساب: ${settings.whatsapp}`);
          if (design.showPhone) contacts.push(`هاتف: ${settings.phone}`);
          if (design.showHandle) contacts.push(`إنستغرام: @${settings.instagram}`);

          ctx.fillText(contacts.join('   |   '), width / 2, footerY - 10);

          ctx.fillStyle = secondaryText;
          ctx.font = '16px Cairo, Tajawal, sans-serif';
          ctx.fillText(settings.address, width / 2, footerY + 18);
        }

        // Download trigger
        const link = document.createElement('a');
        link.download = `basmat-design-${design.format}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        resolve();
      };

      img.onerror = () => {
        // Fallback: download without image or reject
        const link = document.createElement('a');
        link.download = `basmat-design-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        resolve();
      };

      img.src = design.productImage;
    } catch (err) {
      reject(err);
    }
  });
}
