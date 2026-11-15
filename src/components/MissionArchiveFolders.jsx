import { useState, useRef, useEffect } from 'react';
import GlassFolder from './ui/glass-folder-cards';
import SceneErrorBoundary from './3d/SceneErrorBoundary';
import MissionArchivePopup from './MissionArchivePopup';
import { FOLDERS } from '../lib/missionArchiveData';

export default function MissionArchiveFolders() {
  const [activeId, setActiveId] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const anchorEls = useRef({});
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => clearTimers, []);

  const handleFolderMouseEnter = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (isPinned && activeId === id) return;
    if (isPinned) return;
    openTimer.current = setTimeout(() => {
      setActiveId(id);
      setIsPinned(false);
    }, 150);
  };

  const handleFolderMouseLeave = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (!isPinned) {
      closeTimer.current = setTimeout(() => {
        setActiveId(null);
        setIsPinned(false);
      }, 250);
    }
  };

  const handlePopupMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handlePopupMouseLeave = () => {
    if (!isPinned) {
      closeTimer.current = setTimeout(() => {
        setActiveId(null);
        setIsPinned(false);
      }, 250);
    }
  };

  const handleTogglePin = (id) => {
    clearTimers();
    if (activeId === id && isPinned) {
      handleClose();
    } else {
      setActiveId(id);
      setIsPinned(true);
    }
  };

  const handleClose = () => {
    clearTimers();
    const prevId = activeId;
    setActiveId(null);
    setIsPinned(false);
    if (prevId && anchorEls.current[prevId]) {
      anchorEls.current[prevId].focus();
    }
  };

  const activeFolder = FOLDERS.find((f) => f.id === activeId);

  return (
    <section aria-label="Mission archive folders" className="space-y-6">
      <div className="border-b border-border pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brass block mb-1">Interactive Artifacts</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ivory">Mission Archive</h2>
        <p className="text-xs sm:text-sm text-muted mt-1">Hover or click any folder to inspect its NASA source records.</p>
      </div>

      <SceneErrorBoundary>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center pt-2">
          {FOLDERS.map((folder) => {
            const isOpen = activeId === folder.id;
            return (
              <div
                key={folder.id}
                onMouseEnter={() => handleFolderMouseEnter(folder.id)}
                onMouseLeave={handleFolderMouseLeave}
                className="relative"
              >
                <GlassFolder
                  label={folder.label}
                  meta={folder.meta}
                  tone="dark"
                  action="none"
                  art={folder.art}
                  seed={folder.seed}
                  files={folder.files}
                  width={240}
                  appear={true}
                  appearDelay={folder.delay}
                  open={false}
                  onOpenChange={() => handleTogglePin(folder.id)}
                  ariaControls={`popup-${folder.id}`}
                  ariaExpanded={isOpen}
                  buttonRef={(el) => { anchorEls.current[folder.id] = el; }}
                />
              </div>
            );
          })}
        </div>
      </SceneErrorBoundary>

      {activeFolder && (
        <MissionArchivePopup
          folder={activeFolder}
          anchorEl={anchorEls.current[activeFolder.id]}
          isPinned={isPinned}
          onClose={handleClose}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        />
      )}
    </section>
  );
}
