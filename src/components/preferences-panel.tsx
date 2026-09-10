import { useEffect, useState, useMemo } from 'react';
import { SlidersHorizontal, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { foods } from '@/lib/foods';
import { foodName, priceLabel, type Language, type FoodCategory } from '@/lib/i18n';
import { emptyProfile, validateProfile, type PoolProfile, type CustomFood } from '@/lib/personal-pool';
import type { Preferences } from '@/hooks/use-preferences';

export function PreferencesPanel({
  preferences: a,
  language,
  disabled,
  variant = 'header',
  category = 'food'
}: {
  preferences: Preferences;
  language: Language;
  disabled: boolean;
  variant?: 'header' | 'inventory';
  category?: FoodCategory;
}) {
  const vi = language === 'vi';
  const isDrink = category === 'drink';

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<PoolProfile>(emptyProfile);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'food' | 'drink' | 'custom'>('food');

  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('50');
  const [veg, setVeg] = useState(false);
  const [itemCat, setItemCat] = useState<FoodCategory>('food');
  const [notice, setNotice] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setDraft(a.profile);
  }, [a.profile]);

  const resetForm = () => {
    setEditing(null);
    setName('');
    setPrice(tab === 'drink' || itemCat === 'drink' ? '25' : '50');
    setVeg(false);
    setItemCat(tab === 'drink' ? 'drink' : 'food');
  };

  const handleOpen = () => {
    setDraft(a.profile);
    setNotice('');
    setConfirmDelete(false);
    setSearch('');
    setTab(category === 'drink' ? 'drink' : 'food');
    setItemCat(category === 'drink' ? 'drink' : 'food');
    setPrice(category === 'drink' ? '25' : '50');
    setEditing(null);
    setName('');
    setVeg(false);
    setOpen(true);
  };

  const catalogFoods = useMemo(() => foods.filter(f => (f.category || 'food') === 'food'), []);
  const catalogDrinks = useMemo(() => foods.filter(f => f.category === 'drink'), []);

  const disabledFoodCount = useMemo(
    () => draft.disabled.filter(id => catalogFoods.some(f => f.image === id)).length,
    [draft.disabled, catalogFoods]
  );
  const disabledDrinkCount = useMemo(
    () => draft.disabled.filter(id => catalogDrinks.some(f => f.image === id)).length,
    [draft.disabled, catalogDrinks]
  );

  const enabledFoodCount = catalogFoods.length - disabledFoodCount;
  const enabledDrinkCount = catalogDrinks.length - disabledDrinkCount;

  const activeCatalog = tab === 'drink' ? catalogDrinks : catalogFoods;
  const filteredCatalog = useMemo(() => {
    if (!search.trim()) return activeCatalog;
    const q = search.trim().toLocaleLowerCase();
    return activeCatalog.filter(f => {
      const n = foodName(f, language).toLocaleLowerCase();
      const sub = (f.sub || '').toLocaleLowerCase();
      return n.includes(q) || sub.includes(q);
    });
  }, [activeCatalog, search, language]);

  function add() {
    try {
      const item: CustomFood = {
        id: editing || crypto.randomUUID(),
        name: name.trim(),
        price: Number(price),
        veg,
        category: itemCat
      };
      const next = validateProfile({
        ...draft,
        custom: editing ? draft.custom.map(f => (f.id === editing ? item : f)) : [...draft.custom, item]
      });
      updateDraft(next);
      resetForm();
      setNotice('');
    } catch {
      setNotice(
        vi
          ? 'Tên 1–60 ký tự, giá 10–500 nghìn, tối đa 50 món.'
          : 'Name: 1–60 characters, price: 10–500k VND, up to 50 items.'
      );
    }
  }

  const dirty = JSON.stringify(draft) !== JSON.stringify(a.profile);
  const updateDraft = (next: PoolProfile) => {
    setDraft(next);
    a.save(next);
  };

  const enableAllInActiveTab = () => {
    if (tab === 'food') {
      const drinkIds = new Set(catalogDrinks.map(f => f.image));
      updateDraft({ ...draft, disabled: draft.disabled.filter(id => drinkIds.has(id)) });
    } else if (tab === 'drink') {
      const foodIds = new Set(catalogFoods.map(f => f.image));
      updateDraft({ ...draft, disabled: draft.disabled.filter(id => foodIds.has(id)) });
    }
  };

  const buttonLabel = isDrink ? (vi ? 'Nước của tôi' : 'My drinks') : (vi ? 'Món của tôi' : 'My dishes');
  const inventoryFull = isDrink
    ? vi ? 'Tuỳ chỉnh nước uống' : 'Customize drinks'
    : vi ? 'Tuỳ chỉnh món ăn' : 'Customize food';
  const inventoryShort = vi ? 'Tuỳ chỉnh' : 'Customize';

  return (
    <>
      <button
        className={variant === 'inventory' ? 'customize-food-button' : 'preferences-button'}
        disabled={disabled}
        onClick={handleOpen}
        aria-label={variant === 'inventory' ? inventoryFull : buttonLabel}
      >
        {variant === 'inventory' ? (
          <>
            <SlidersHorizontal size={16} />
            <span className="customize-full">{inventoryFull}</span>
            <span className="customize-short">{inventoryShort}</span>
          </>
        ) : (
          <>
            <SlidersHorizontal size={17} />
            <span>{buttonLabel}</span>
          </>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="preferences-dialog">
          <DialogTitle>{isDrink ? (vi ? 'Nước của tôi' : 'My drinks') : (vi ? 'Món của tôi' : 'My dishes')}</DialogTitle>
          <DialogDescription>
            {vi
              ? 'Tự động lưu lựa chọn bằng cookie trên máy này.'
              : 'Choices are automatically saved in cookies on this computer.'}
          </DialogDescription>

          <div className="pool-tabs">
            <button className={tab === 'food' ? 'selected' : ''} onClick={() => { setTab('food'); setSearch(''); }}>
              {vi ? 'Món ăn có sẵn' : 'Food'} ({enabledFoodCount})
            </button>
            <button className={tab === 'drink' ? 'selected' : ''} onClick={() => { setTab('drink'); setSearch(''); }}>
              {vi ? 'Nước uống có sẵn' : 'Drinks'} ({enabledDrinkCount})
            </button>
            <button className={tab === 'custom' ? 'selected' : ''} onClick={() => setTab('custom')}>
              {vi ? 'Món tự thêm' : 'Custom'} ({draft.custom.length}/50)
            </button>
          </div>

          <div className="pool-body">
            <fieldset>
              {tab === 'food' || tab === 'drink' ? (
                <>
                  <input
                    className="pool-search"
                    placeholder={tab === 'drink' ? (vi ? 'Tìm thức uống…' : 'Search drinks…') : (vi ? 'Tìm món…' : 'Search dishes…')}
                    aria-label={tab === 'drink' ? (vi ? 'Tìm thức uống' : 'Search drinks') : (vi ? 'Tìm món' : 'Search dishes')}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                  <div className="pool-list">
                    {filteredCatalog.map(f => (
                      <label className="pool-row" key={f.image}>
                        <input
                          type="checkbox"
                          checked={!draft.disabled.includes(f.image)}
                          onChange={e =>
                            updateDraft({
                              ...draft,
                              disabled: e.target.checked
                                ? draft.disabled.filter(id => id !== f.image)
                                : [...draft.disabled, f.image]
                            })
                          }
                        />
                        <span>
                          {foodName(f, language)}
                          {f.veg ? ' · 🌱' : ''}
                        </span>
                        <small>{priceLabel(f.price, language)}</small>
                      </label>
                    ))}
                    {filteredCatalog.length === 0 && (
                      <p style={{ padding: '16px 0', color: '#9bb0be', textAlign: 'center' }}>
                        {vi ? 'Không tìm thấy kết quả phù hợp.' : 'No matching items.'}
                      </p>
                    )}
                  </div>
                  <button className="subtle-button" onClick={enableAllInActiveTab}>
                    {tab === 'drink'
                      ? (vi ? 'Bật lại tất cả nước uống có sẵn' : 'Enable all catalog drinks')
                      : (vi ? 'Bật lại tất cả món ăn có sẵn' : 'Enable all catalog dishes')}
                  </button>
                </>
              ) : (
                <>
                  <div className="custom-form">
                    <label>
                      {itemCat === 'drink' ? (vi ? 'Tên thức uống' : 'Drink name') : (vi ? 'Tên món' : 'Dish name')}
                      <input value={name} maxLength={60} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                      {vi ? 'Giá (nghìn đồng)' : 'Price (thousand VND)'}
                      <input
                        type="number"
                        min="10"
                        max="500"
                        step="1"
                        inputMode="numeric"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                    </label>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <label className="inline-check">
                        <input
                          type="checkbox"
                          checked={veg}
                          onChange={e => setVeg(e.target.checked)}
                        />
                        {vi ? 'Món chay / Thuần chay' : 'Vegetarian'}
                      </label>
                      <label className="inline-check">
                        <input
                          type="checkbox"
                          checked={itemCat === 'drink'}
                          onChange={e => setItemCat(e.target.checked ? 'drink' : 'food')}
                        />
                        {vi ? 'Là nước uống' : 'Is beverage'}
                      </label>
                    </div>
                    <button className="pool-primary" onClick={add}>
                      <Plus size={16} />
                      {editing
                        ? (vi ? 'Cập nhật' : 'Update')
                        : itemCat === 'drink'
                        ? (vi ? 'Thêm nước' : 'Add drink')
                        : (vi ? 'Thêm món' : 'Add dish')}
                    </button>
                    {editing && <button onClick={resetForm}>{vi ? 'Huỷ sửa' : 'Cancel edit'}</button>}
                  </div>

                  <div className="pool-list">
                    {draft.custom.length === 0 && (
                      <p>{vi ? 'Thêm quán quen, món tủ hoặc thức uống yêu thích của bạn.' : 'Add your favorite dish or drink.'}</p>
                    )}
                    {draft.custom.map(f => (
                      <div className="pool-row" key={f.id}>
                        <button
                          onClick={() => {
                            setEditing(f.id);
                            setName(f.name);
                            setPrice(String(f.price));
                            setVeg(f.veg);
                            setItemCat(f.category === 'drink' ? 'drink' : 'food');
                          }}
                        >
                          {f.name}
                          {f.veg ? ' · 🌱' : ''}
                          {f.category === 'drink' && <small style={{ marginLeft: 6, color: '#88a8c4' }}>({vi ? 'Nước' : 'Drink'})</small>}
                        </button>
                        <small>{priceLabel(f.price, language)}</small>
                        <button
                          aria-label={`${vi ? 'Xóa' : 'Remove'} ${f.name}`}
                          onClick={() => {
                            updateDraft({ ...draft, custom: draft.custom.filter(item => item.id !== f.id) });
                            if (editing === f.id) resetForm();
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </fieldset>
          </div>

          <div className="pool-save">
            <small>
              {foods.length - draft.disabled.length + draft.custom.length} {vi ? 'món trong hòm' : 'dishes in case'} ·{' '}
              {dirty ? (vi ? 'Chưa lưu' : 'Unsaved') : (vi ? 'Tự động lưu trên máy' : 'Saved automatically')}
            </small>
          </div>

          <div className="preferences-bottom">
            <button
              onClick={async () => {
                const p = await a.reload();
                if (p) setDraft(p);
              }}
            >
              {vi ? 'Tải lại cookie' : 'Reload cookies'}
            </button>
            <button onClick={() => setConfirmDelete(!confirmDelete)}>
              {vi ? 'Xóa danh sách đã lưu' : 'Clear saved dishes'}
            </button>
          </div>

          {confirmDelete && (
            <div className="delete-confirm">
              <p>
                {vi
                  ? 'Xóa danh sách món đã lưu trên trình duyệt này?'
                  : 'Clear the saved food pool on this browser?'}
              </p>
              <button
                onClick={async () => {
                  if (await a.remove()) setOpen(false);
                }}
              >
                {vi ? 'Xác nhận xóa' : 'Confirm deletion'}
              </button>
            </div>
          )}

          {(a.error || notice) && (
            <p className="preferences-message" role="status">
              {a.error || notice}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
