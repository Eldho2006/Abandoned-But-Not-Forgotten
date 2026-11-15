import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function MissionArchivePopup({
  folder,
  anchorEl,
  isPinned,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) {
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();

    const updatePosition = () => {
      checkMobile();
      if (!anchorEl || window.innerWidth < 640) return;
      const rect = anchorEl.getBoundingClientRect();
      const popupWidth = 360;
      const popupHeight = 440;

      let left = rect.right + 12;
      if (left + popupWidth > window.innerWidth - 16) {
        left = rect.left - popupWidth - 12;
      }
      left = Math.max(16, Math.min(left, window.innerWidth - popupWidth - 16));

      let top = rect.top;
      if (top + popupHeight > window.innerHeight - 16) {
        top = window.innerHeight - popupHeight - 16;
      }
      setPos({ top: Math.max(16, top), left });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [anchorEl]);

  useEffect(() => {
    if (isPinned && firstLinkRef.current) firstLinkRef.current.focus();
  }, [isPinned]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    const handleClickOutside = (e) => {
      if (isPinned && popupRef.current && !popupRef.current.contains(e.target) && anchorEl && !anchorEl.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isPinned, onClose, anchorEl]);

  const handleCopy = (url) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 1500);
      });
    }
  };

  if (!folder) return null;
  const count = folder.sources?.length || 0;

  const content = (
    <div
      ref={popupRef}
      id={`popup-${folder.id}`}
      role="dialog"
      aria-label={`${folder.label} sources`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`z-50 bg-surface/98 border border-border shadow-2xl text-ivory backdrop-blur-lg motion-safe:transition-all motion-safe:duration-180 motion-safe:ease-out ${
        isMobile
          ? 'fixed inset-x-0 bottom-0 rounded-t-2xl max-h-[70vh] p-5 border-t motion-safe:animate-[fadeInUp_180ms_ease-out]'
          : 'fixed w-[360px] rounded-2xl p-5 border motion-safe:animate-[fadeInUp_180ms_ease-out]'
      }`}
      style={!isMobile ? { top: `${pos.top}px`, left: `${pos.left}px` } : undefined}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-ivory">{folder.label}</h3>
          <span className="text-xs text-muted block mt-0.5">{count} {count === 1 ? 'source' : 'sources'}</span>
        </div>
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-xs font-semibold text-brass hover:text-brass-hover"
            aria-label="Close popup"
          >
            Close
          </button>
        )}
      </div>

      <div className="relative">
        <div
          tabIndex={0}
          aria-label={`${folder.label} sources list`}
          className="max-h-[50vh] sm:max-h-[55vh] overflow-y-auto space-y-3 pr-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass rounded-lg"
        >
          {folder.sources.map((item, idx) => (
            <div key={item.href || idx} className="p-3 rounded-xl bg-bg border border-border hover:border-brass/50 transition-colors space-y-2 group">
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-alt text-muted border border-border">
                  {item.tag}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-ivory leading-snug group-hover:text-brass transition-colors">
                  {item.title}
                </h4>
              </div>
              {item.desc && <p className="text-[11px] sm:text-xs text-muted leading-relaxed">{item.desc}</p>}
              <div className="flex items-center justify-between pt-1 text-xs">
                <a
                  ref={idx === 0 ? firstLinkRef : null}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brass hover:text-brass-hover transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
                >
                  Open ↗
                </a>
                {typeof navigator !== 'undefined' && navigator.clipboard && (
                  <button
                    type="button"
                    onClick={() => handleCopy(item.href)}
                    className="text-[11px] text-muted hover:text-ivory transition-colors px-2 py-0.5 rounded bg-surface-alt border border-border"
                  >
                    {copiedUrl === item.href ? 'Copied' : 'Copy link'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-5 bg-gradient-to-t from-surface/90 to-transparent" />
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
}
