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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
      case 'duration': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <Button className="gradient-bg text-white border-0 hover:opacity-90">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Создать продукт
              </Button>
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

          {/* Other tabs with placeholder content */}
          <TabsContent value="dictionaries" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Словари</h2>
                <p className="text-slate-600">Управление справочными данными</p>
              </div>
              <Button className="gradient-bg text-white border-0 hover:opacity-90">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Создать словарь
              </Button>
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
              <Button className="gradient-bg text-white border-0 hover:opacity-90">
                <Icon name="Plus" className="w-4 h-4 mr-2" />
                Добавить фактор
              </Button>
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
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <Icon name="BarChart3" className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p>График будет здесь</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="PieChart" className="w-5 h-5 text-purple-600" />
                    <span>Распределение рисков</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <Icon name="PieChart" className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p>Диаграмма будет здесь</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}