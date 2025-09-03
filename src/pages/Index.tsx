import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'draft' | 'archived';
  coverage: number;
  premium: number;
  created: string;
}

interface Dictionary {
  id: string;
  name: string;
  items: number;
  category: string;
}

interface TariffFactor {
  id: string;
  name: string;
  type: 'age' | 'geography' | 'activity' | 'duration';
  multiplier: number;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isWidgetPreviewOpen, setIsWidgetPreviewOpen] = useState(false);
  const [widgetSettings, setWidgetSettings] = useState({
    theme: 'light',
    primaryColor: '#2563EB',
    products: ['1', '2']
  });
  
  const products: Product[] = [
    { id: '1', name: 'Путешествие Стандарт', type: 'travel', status: 'active', coverage: 50000, premium: 1250, created: '2024-01-15' },
    { id: '2', name: 'Автострахование Комфорт', type: 'auto', status: 'active', coverage: 300000, premium: 15000, created: '2024-01-10' },
    { id: '3', name: 'Спорт Экстрим', type: 'sports', status: 'draft', coverage: 100000, premium: 3500, created: '2024-01-20' },
    { id: '4', name: 'Здоровье Плюс', type: 'health', status: 'active', coverage: 500000, premium: 25000, created: '2024-01-05' }
  ];

  const dictionaries: Dictionary[] = [
    { id: '1', name: 'Страны', items: 195, category: 'География' },
    { id: '2', name: 'Виды спорта', items: 87, category: 'Активность' },
    { id: '3', name: 'Типы транспорта', items: 24, category: 'Транспорт' },
    { id: '4', name: 'Возрастные группы', items: 8, category: 'Демография' }
  ];

  const tariffFactors: TariffFactor[] = [
    { id: '1', name: 'Возраст 18-25', type: 'age', multiplier: 1.5 },
    { id: '2', name: 'Европа', type: 'geography', multiplier: 1.2 },
    { id: '3', name: 'Экстремальные виды спорта', type: 'activity', multiplier: 2.0 },
    { id: '4', name: 'Поездка >30 дней', type: 'duration', multiplier: 1.8 }
  ];

  // Sample data for charts
  const salesData = [
    { month: 'Янв', value: 45, growth: 12 },
    { month: 'Фев', value: 52, growth: 15 },
    { month: 'Мар', value: 61, growth: 17 },
    { month: 'Апр', value: 58, growth: -5 },
    { month: 'Май', value: 67, growth: 15 },
    { month: 'Июн', value: 73, growth: 9 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'travel': return 'Plane';
      case 'auto': return 'Car';
      case 'sports': return 'Trophy';
      case 'health': return 'Heart';
      default: return 'Shield';
    }
  };

  const getTariffTypeColor = (type: string) => {
    switch (type) {
      case 'age': return 'bg-blue-100 text-blue-800';
      case 'geography': return 'bg-green-100 text-green-800';
      case 'activity': return 'bg-purple-100 text-purple-800';
      case 'duration': return 'bg-sky-100 text-sky-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Interactive Chart Component
  const SalesChart = () => (
    <div className="space-y-4">
      {salesData.map((item, index) => (
        <div key={item.month} className="flex items-center space-x-4">
          <span className="text-sm w-8 text-slate-600">{item.month}</span>
          <div className="flex-1 bg-slate-100 rounded-full h-3 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${item.value}%`, animationDelay: `${index * 100}ms` }}
            />
          </div>
          <span className="text-sm w-12 font-medium text-slate-900">{item.value}%</span>
          <span className={`text-xs px-2 py-1 rounded ${item.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {item.growth > 0 ? '+' : ''}{item.growth}%
          </span>
        </div>
      ))}
    </div>
  );

  // Risk Distribution Chart
  const RiskChart = () => {
    const risks = [
      { name: 'Низкий', value: 45, color: 'bg-green-500' },
      { name: 'Средний', value: 35, color: 'bg-blue-500' },
      { name: 'Высокий', value: 15, color: 'bg-orange-500' },
      { name: 'Критический', value: 5, color: 'bg-red-500' },
    ];

    return (
      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div key={risk.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">{risk.name}</span>
              <span className="text-sm font-medium">{risk.value}%</span>
            </div>
            <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${risk.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${risk.value}%`, animationDelay: `${index * 150}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Widget Preview Component
  const WidgetPreview = () => (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <h3 className="text-white font-bold text-lg">Страхование</h3>
        <p className="text-blue-100 text-sm">Выберите подходящий продукт</p>
      </div>
      <div className="p-4 space-y-4">
        {products.filter(p => widgetSettings.products.includes(p.id)).map(product => (
          <div key={product.id} className="border rounded-lg p-3 hover:border-blue-300 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name={getTypeIcon(product.type)} className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">от ₽{product.premium.toLocaleString()}</p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Выбрать
              </Button>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Получить консультацию
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Icon name="Shield" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Insurance Constructor</h1>
                <p className="text-sm text-slate-600">Конструктор страховых продуктов</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Icon name="Users" className="w-3 h-3 mr-1" />
                Администратор
              </Badge>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Icon name="Code" className="w-4 h-4 mr-2" />
                    Виджет
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Предварительный просмотр виджета</SheetTitle>
                    <SheetDescription>
                      Настройте и протестируйте виджет для внешних сайтов
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-6 py-6">
                    <div className="space-y-4">
                      <Label>Настройки виджета</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="theme">Тема</Label>
                          <Select value={widgetSettings.theme} onValueChange={(value) => setWidgetSettings({...widgetSettings, theme: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Светлая</SelectItem>
                              <SelectItem value="dark">Темная</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="color">Цвет</Label>
                          <Input 
                            type="color" 
                            value={widgetSettings.primaryColor}
                            onChange={(e) => setWidgetSettings({...widgetSettings, primaryColor: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Продукты для отображения</Label>
                        <div className="space-y-2">
                          {products.map(product => (
                            <div key={product.id} className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                checked={widgetSettings.products.includes(product.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setWidgetSettings({...widgetSettings, products: [...widgetSettings.products, product.id]});
                                  } else {
                                    setWidgetSettings({...widgetSettings, products: widgetSettings.products.filter(id => id !== product.id)});
                                  }
                                }}
                                className="rounded"
                              />
                              <span className="text-sm">{product.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label>Предварительный просмотр</Label>
                      <div className="border rounded-lg p-4 bg-slate-50">
                        <WidgetPreview />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Код для вставки</Label>
                      <textarea 
                        className="w-full p-3 border rounded-lg text-xs font-mono bg-gray-50"
                        rows={4}
                        readOnly
                        value={`<script src="https://insurance-widget.example.com/widget.js"></script>
<div id="insurance-widget" 
     data-products="${widgetSettings.products.join(',')}"
     data-theme="${widgetSettings.theme}"
     data-color="${widgetSettings.primaryColor}">
</div>`}
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="sm">
                <Icon name="Settings" className="w-4 h-4 mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Icon name="BarChart3" className="w-4 h-4" />
              <span className="hidden sm:inline">Панель</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Icon name="Package" className="w-4 h-4" />
              <span className="hidden sm:inline">Продукты</span>
            </TabsTrigger>
            <TabsTrigger value="constructor" className="flex items-center space-x-2">
              <Icon name="Wrench" className="w-4 h-4" />
              <span className="hidden sm:inline">Конструктор</span>
            </TabsTrigger>
            <TabsTrigger value="dictionaries" className="flex items-center space-x-2">
              <Icon name="Book" className="w-4 h-4" />
              <span className="hidden sm:inline">Словари</span>
            </TabsTrigger>
            <TabsTrigger value="tariffs" className="flex items-center space-x-2">
              <Icon name="Calculator" className="w-4 h-4" />
              <span className="hidden sm:inline">Тарифы</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <Icon name="TrendingUp" className="w-4 h-4" />
              <span className="hidden sm:inline">Отчеты</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Активные продукты</CardTitle>
                  <Icon name="Package" className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">24</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <Icon name="TrendingUp" className="w-3 h-3 mr-1" />
                    +12% за месяц
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Общая премия</CardTitle>
                  <Icon name="DollarSign" className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">₽2.4М</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <Icon name="TrendingUp" className="w-3 h-3 mr-1" />
                    +18% за месяц
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Виджеты</CardTitle>
                  <Icon name="Globe" className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">156</div>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Icon name="Activity" className="w-3 h-3 mr-1" />
                    89% активность
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">Конверсия</CardTitle>
                  <Icon name="Target" className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">12.3%</div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <Icon name="TrendingUp" className="w-3 h-3 mr-1" />
                    +2.1% за неделю
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="BarChart3" className="w-5 h-5 text-blue-600" />
                    <span>Популярные продукты</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                          <Icon name={getTypeIcon(product.type)} className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <p className="text-sm text-slate-600">Покрытие: ₽{product.coverage.toLocaleString()}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status === 'active' ? 'Активен' : product.status === 'draft' ? 'Черновик' : 'Архив'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="PieChart" className="w-5 h-5 text-purple-600" />
                    <span>Распределение по типам</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Путешествия</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Автострахование</span>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Спорт</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Здоровье</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Страховые продукты</h2>
                <p className="text-slate-600">Управление линейкой страховых продуктов</p>
              </div>
              <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-bg text-white border-0 hover:opacity-90">
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Создать продукт
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создание нового продукта</DialogTitle>
                    <DialogDescription>
                      Заполните основную информацию о страховом продукте
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="modal-product-name">Название продукта</Label>
                        <Input id="modal-product-name" placeholder="Введите название" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="modal-product-type">Тип страхования</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="travel">Путешествия</SelectItem>
                            <SelectItem value="auto">Автострахование</SelectItem>
                            <SelectItem value="health">Здоровье</SelectItem>
                            <SelectItem value="sports">Спорт</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modal-description">Описание</Label>
                      <Textarea id="modal-description" placeholder="Описание продукта" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="modal-coverage">Покрытие (₽)</Label>
                        <Input id="modal-coverage" type="number" placeholder="100000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="modal-premium">Базовая премия (₽)</Label>
                        <Input id="modal-premium" type="number" placeholder="2500" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsProductModalOpen(false)}>
                        Отмена
                      </Button>
                      <Button className="gradient-bg text-white" onClick={() => setIsProductModalOpen(false)}>
                        Создать продукт
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="card-hover cursor-pointer" onClick={() => setSelectedProduct(product.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                        <Icon name={getTypeIcon(product.type)} className="w-5 h-5 text-white" />
                      </div>
                      <Badge className={getStatusColor(product.status)}>
                        {product.status === 'active' ? 'Активен' : product.status === 'draft' ? 'Черновик' : 'Архив'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Покрытие:</span>
                      <span className="font-semibold">₽{product.coverage.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Премия:</span>
                      <span className="font-semibold text-green-600">₽{product.premium.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Создан:</span>
                      <span className="text-slate-500">{new Date(product.created).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" className="w-3 h-3 mr-1" />
                        Редактировать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="MoreVertical" className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Constructor Tab */}
          <TabsContent value="constructor" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Конструктор продуктов</h2>
                <p className="text-slate-600">Создание и настройка страховых продуктов</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="Settings" className="w-5 h-5 text-blue-600" />
                      <span>Основные параметры</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-name">Название продукта</Label>
                        <Input id="product-name" placeholder="Введите название продукта" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="product-type">Тип страхования</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="travel">Путешествия</SelectItem>
                            <SelectItem value="auto">Автострахование</SelectItem>
                            <SelectItem value="health">Здоровье</SelectItem>
                            <SelectItem value="sports">Спорт</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea id="description" placeholder="Описание продукта" rows={3} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="base-coverage">Базовое покрытие (₽)</Label>
                        <Input id="base-coverage" type="number" placeholder="50000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="base-premium">Базовая премия (₽)</Label>
                        <Input id="base-premium" type="number" placeholder="1500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="Calculator" className="w-5 h-5 text-green-600" />
                      <span>Формула расчета</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                      <p className="text-sm text-slate-600 mb-2">Формула расчета премии:</p>
                      <div className="font-mono text-sm bg-white p-3 rounded border">
                        Премия = Базовая_ставка × Коэф_возраста × Коэф_страны × Коэф_активности
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Учитывать возраст</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Учитывать географию</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Учитывать активность</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Учитывать длительность</Label>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="Eye" className="w-5 h-5 text-purple-600" />
                      <span>Предварительный просмотр</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                          <Icon name="Shield" className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">Новый продукт</h4>
                          <p className="text-xs text-slate-600">Предварительный расчет</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Покрытие:</span>
                          <span className="font-medium">₽50,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Базовая премия:</span>
                          <span className="font-medium">₽1,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">С учетом коэф.:</span>
                          <span className="font-medium text-green-600">₽2,250</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full gradient-bg text-white border-0 hover:opacity-90">
                      <Icon name="Save" className="w-4 h-4 mr-2" />
                      Сохранить продукт
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Доступные тарифные факторы</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {tariffFactors.slice(0, 4).map((factor) => (
                      <div key={factor.id} className="flex items-center justify-between p-2 rounded bg-slate-50 text-sm">
                        <span className="text-slate-900">{factor.name}</span>
                        <Badge variant="outline" className={getTariffTypeColor(factor.type)}>
                          ×{factor.multiplier}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Dictionaries Tab */}
          <TabsContent value="dictionaries" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Словари</h2>
                <p className="text-slate-600">Управление справочными данными</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-bg text-white border-0 hover:opacity-90">
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Создать словарь
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Создание нового словаря</DialogTitle>
                    <DialogDescription>
                      Создайте справочник для использования в продуктах
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dict-name">Название словаря</Label>
                        <Input id="dict-name" placeholder="Например: Страны" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dict-category">Категория</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="geography">География</SelectItem>
                            <SelectItem value="activity">Активность</SelectItem>
                            <SelectItem value="transport">Транспорт</SelectItem>
                            <SelectItem value="demographics">Демография</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dict-description">Описание</Label>
                      <Textarea id="dict-description" placeholder="Описание словаря" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Отмена</Button>
                      <Button className="gradient-bg text-white">Создать</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dictionaries.map((dict) => (
                <Card key={dict.id} className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{dict.name}</span>
                      <Badge variant="secondary">{dict.category}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-slate-900">{dict.items}</span>
                      <span className="text-sm text-slate-600">элементов</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Icon name="Edit" className="w-4 h-4 mr-2" />
                      Редактировать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tariffs" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Тарифные факторы</h2>
                <p className="text-slate-600">Коэффициенты для расчета премий</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-bg text-white border-0 hover:opacity-90">
                    <Icon name="Plus" className="w-4 h-4 mr-2" />
                    Добавить фактор
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый тарифный фактор</DialogTitle>
                    <DialogDescription>
                      Создайте коэффициент для расчета страховых премий
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="factor-name">Название фактора</Label>
                        <Input id="factor-name" placeholder="Например: Возраст 26-35" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="factor-type">Тип фактора</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="age">Возраст</SelectItem>
                            <SelectItem value="geography">География</SelectItem>
                            <SelectItem value="activity">Активность</SelectItem>
                            <SelectItem value="duration">Длительность</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="factor-multiplier">Множитель</Label>
                      <Input id="factor-multiplier" type="number" placeholder="1.2" step="0.1" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Отмена</Button>
                      <Button className="gradient-bg text-white">Создать</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tariffFactors.map((factor) => (
                <Card key={factor.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{factor.name}</CardTitle>
                      <Badge className={getTariffTypeColor(factor.type)}>
                        {factor.type === 'age' ? 'Возраст' : 
                         factor.type === 'geography' ? 'География' :
                         factor.type === 'activity' ? 'Активность' : 'Длительность'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-600">Множитель:</span>
                      <span className="text-2xl font-bold text-slate-900">×{factor.multiplier}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Icon name="Edit" className="w-3 h-3 mr-1" />
                        Изменить
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="MoreVertical" className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Отчеты и аналитика</h2>
              <p className="text-slate-600">Анализ эффективности продуктов</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="TrendingUp" className="w-5 h-5 text-blue-600" />
                    <span>Динамика продаж</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <SalesChart />
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="PieChart" className="w-5 h-5 text-purple-600" />
                    <span>Распределение рисков</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <RiskChart />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Users" className="w-5 h-5 text-green-600" />
                    <span>Активные клиенты</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 mb-2">2,847</div>
                  <p className="text-sm text-slate-600 mb-4">+23% за последний квартал</p>
                  <Progress value={78} className="h-2" />
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Clock" className="w-5 h-5 text-orange-600" />
                    <span>Средняя конверсия</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 mb-2">8.7%</div>
                  <p className="text-sm text-slate-600 mb-4">Время обработки: 2.3 мин</p>
                  <Progress value={87} className="h-2" />
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Shield" className="w-5 h-5 text-purple-600" />
                    <span>Выплаченные претензии</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900 mb-2">₽1.2М</div>
                  <p className="text-sm text-slate-600 mb-4">156 обработанных случаев</p>
                  <Progress value={45} className="h-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}